const { User, Items, Cart } = require("./TypeDef");
//const UserController = require("../controller/User");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");
//const Userdb = require("../models/model");
const itemsDb = require("../models/itemModel.js");
const usersDb = require("../models/userModel.js");
const userFavorites = require("../models/userFavoritesModel");
const { default: mongoose } = require("mongoose");
const query = new GraphQLObjectType({
  name: "query",
  fields: {
    getAllItems: {
      type: new GraphQLList(Items),
      // args: {
      //   email: { type: GraphQLString },
      // },
      resolve(parent, args) {
        return itemsDb.find({});
      },
    },
    getUserDetails: {
      type: User,
      async resolve(parent, args, req) {
        if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", req.user.user_id);
        return await usersDb.findOne({
          _id: req.user.user_id,
        });
      },
    },
    checkShopName: {
      type: User,
      args: {
        shop_name: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        console.log(args.shop_name);
        if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", req.user.user_id);
        const shopAvailability = await usersDb
          .findOne({ shop_name: args.shop_name })
          .count();
        console.log(shopAvailability);
        if (shopAvailability !== 0) throw new Error("shop name already exists");
        return args;
      },
    },

    getAllItemsById: {
      type: new GraphQLList(Items),
      async resolve(parent, args, req) {
        console.log("Inside get all elements by id with favs");
        var fav_data = [];
        var un_fav = [];
        const fav_documents = await userFavorites.find({
          user: mongoose.Types.ObjectId(req.user.user_id),
        });
        let items = [];
        fav_documents.map((doc) => items.push(doc.item.toString()));

        const all_fav = await itemsDb.find().lean();

        if (all_fav.length) {
          for (let doc of all_fav) {
            if (items.includes(doc._id.toString())) {
              fav_data.push({
                user_id: doc.user,
                item_id: doc._id,
                item_name: doc.item_name,
                item_price: parseFloat(doc.item_price),
                item_desc: doc.item_desc,
                item_quantity: doc.item_quantity,
                item_category: doc.item_category,
                item_image: doc.item_image ? doc.item_image : null,
                sales_count: doc.sales_count,
                is_Favorite: true,
                //is_Favorite: items.includes(doc._id.toString()) ? true : false,
              });
            } else {
              un_fav.push({
                user_id: doc.user,
                item_id: doc._id,
                item_name: doc.item_name,
                item_price: parseFloat(doc.item_price),
                item_desc: doc.item_desc,
                item_quantity: doc.item_quantity,
                item_category: doc.item_category,
                item_image: doc.item_image ? doc.item_image : null,
                sales_count: doc.sales_count,
                is_Favorite: false,
                // is_Favorite: items.includes(doc._id.toString()) ? true : false,
              });
            }
          }
        }
        fav_data = [...fav_data, ...un_fav];
        console.log(all_fav);
        return all_fav;
      },
    },
    //     itemDetails:{
    //         type : Items,
    //         args : {
    //           item_id: { type: GraphQLString },
    //          },
    //         aysnc resolve(parent, args, req){

    //         }

    //   },
  },
});

module.exports = {
  query,
};

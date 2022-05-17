const {
  User,
  Items,
  Cart,
  Cart_Rel,
  Purchases_Rel,
  Items_Rel,
} = require("./TypeDef");
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
const cartDb = require("../models/cartModel.js");
const purchaseDb = require("../models/purchasesModel");
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
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log("User Id :::: ", args.user_id);
        return await usersDb.findOne({
          _id: args.user_id,
        });
      },
    },

    checkShopName: {
      type: User,
      args: {
        user_id: { type: GraphQLString },
        shop_name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args.shop_name);
        //if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", args.user_id);
        const shopAvailability = await usersDb
          .findOne({ shop_name: args.shop_name })
          .count();
        console.log(shopAvailability);
        if (shopAvailability !== 0) args.shop_name = "exist";
        //throw new Error("shop name already exists");
        return args;
      },
    },
    getShopDetails: {
      type: User,
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", args.user_id);
        const doc = await usersDb.find({ _id: args.user_id });
        console.log(doc[0]);
        return doc[0];
      },
    },
    getShopDetailsById: {
      type: User,
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        //if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", args.user_id);
        const doc = await usersDb.find({ _id: args.user_id });
        console.log(doc[0]);
        return doc[0];
      },
    },
    getCartItems: {
      type: new GraphQLList(Cart_Rel),
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const documents = await cartDb
          .find({
            user: mongoose.Types.ObjectId(args.user_id),
          })
          .populate("item user");

        console.log("Documents ", documents);
        return documents;
      },
    },
    getPreviousOrders: {
      type: new GraphQLList(Purchases_Rel),
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await purchaseDb
          .find({
            user: mongoose.Types.ObjectId(args.user_id),
          })
          .populate("order");
      },
    },
    getShopItems: {
      type: new GraphQLList(Items_Rel),
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await itemsDb
          .find({
            user: mongoose.Types.ObjectId(args.user_id),
          })
          .populate("user");
      },
    },
    getShopItemsById: {
      type: new GraphQLList(Items_Rel),
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await itemsDb
          .find({
            user: mongoose.Types.ObjectId(args.user_id),
          })
          .populate("user");
      },
    },
    getItemDetails: {
      type: Items_Rel,
      args: {
        user_id: { type: GraphQLString },
        item_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await itemsDb.findById(args.item_id).populate("user");
      },
    },
    getAllItemsById: {
      type: new GraphQLList(Items),
      args: {
        user_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log("Inside get all elements by id with favs");
        var fav_data = [];
        var un_fav = [];
        const fav_documents = await userFavorites.find({
          user: mongoose.Types.ObjectId(args.user_id),
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
  },
});

module.exports = {
  query,
};

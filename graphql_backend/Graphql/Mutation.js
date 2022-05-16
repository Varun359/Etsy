const { Cart, Items, User, Cart_Rel } = require("./TypeDef");
const UserController = require("../controllers/userController");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");
const checkAuth = require("../middlewares/auth");
const usersDb = require("../models/userModel.js");
const itemsDb = require("../models/itemModel.js");
const cartDb = require("../models/cartModel.js");
const { default: mongoose } = require("mongoose");
const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    editProfile: {
      type: User,
      args: {
        user_id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        city: { type: GraphQLString },
        phone_no: { type: GraphQLString },
        country: { type: GraphQLString },
        DOB: { type: GraphQLString },
        about: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args.first_name);
        console.log(args.gender);
        // if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", args.user_id);
        await usersDb.findByIdAndUpdate(
          args.user_id,
          {
            first_name: args.first_name,
            email: args.email,
            city: args.city,
            phone_no: args.phone_no,
            country: args.country,
            DOB: args.DOB,
            about: args.about,
            address: args.address,
            gender: args.gender,
          }
          //   {
          //     new: true,
          //   }
        );
        return args;
      },
    },
    insertIntoShop: {
      type: Items,
      args: {
        user_id: { type: GraphQLString },
        item_name: { type: GraphQLString },
        item_price: { type: GraphQLString },
        item_category: { type: GraphQLString },
        item_desc: { type: GraphQLString },
        item_image: { type: GraphQLString },
        item_quantity: { type: GraphQLInt },
        user: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await itemsDb.create({
          item_name: args.item_name,
          item_price: args.item_price,
          item_category: args.item_category,
          item_desc: args.item_desc,
          item_image: args.item_image,
          item_quantity: args.item_quantity,
          user: args.user_id,
        });
      },
    },
    editShopItem: {
      type: Items,
      args: {
        user_id: { type: GraphQLString },
        item_id: { type: GraphQLString },
        item_name: { type: GraphQLString },
        item_price: { type: GraphQLString },
        item_category: { type: GraphQLString },
        item_desc: { type: GraphQLString },
        item_image: { type: GraphQLString },
        item_quantity: { type: GraphQLInt },
        user: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await itemsDb.findByIdAndUpdate(
          mongoose.Types.ObjectId(args._id),
          {
            item_name: args.item_name,
            item_price: args.item_price,
            item_category: args.item_category,
            item_desc: args.item_desc,
            item_image: args.item_image,
            item_quantity: args.item_quantity,
            user: args.user_id,
          },
          {
            new: true,
          }
        );
      },
    },
    createShop: {
      type: User,
      args: {
        user_id: { type: GraphQLString },
        shop_name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log("Inside Create Shop", args.user_id);
        const doc = await usersDb.findByIdAndUpdate(
          args.user_id,
          {
            shop_name: args.shop_name,
          },
          {
            new: true,
          }
        );
        return doc;
      },
    },
    addItemToCart: {
      type: Cart_Rel,
      args: {
        user_id: { type: GraphQLString },
        item_id: { type: GraphQLString },
        quantity: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        console.log("add to the cart");
        const documents = await cartDb.find(
          {
            item: mongoose.Types.ObjectId(args.item_id),
          },
          {
            new: true,
          }
        );
        console.log("document length", documents.length);
        if (documents.length === 0) {
          const doc = await cartDb.create(
            {
              item: mongoose.Types.ObjectId(args.item_id),
              user: mongoose.Types.ObjectId(args.user_id),
              quantity: args.quantity,
            },
            {
              new: true,
            }
          );
          console.log("Creating return", doc);
        }
        console.log(documents[0]);
        return documents;
      },
    },
    deleteCartItems: {
      type: Cart,
      async resolve(parent, args) {
        let deletedCart = await cartDb.deleteMany({
          user: mongoose.Types.ObjectId(args.user_id),
        });
        return deletedCart;
      },
    },
  },
});

module.exports = {
  mutation,
};

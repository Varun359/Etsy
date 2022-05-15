const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    password: { type: GraphQLString },
    DOB: { type: GraphQLString },
    gender: { type: GraphQLString },
    user_image: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    about: { type: GraphQLString },
    shop_name: { type: GraphQLString },
    shop_image: { type: GraphQLString },
  }),
});

const Items = new GraphQLObjectType({
  name: "Items",
  fields: () => ({
    _id: { type: GraphQLString },
    user: { type: GraphQLString },
    item_name: { type: GraphQLString },
    item_category: { type: GraphQLString },
    item_price: { type: GraphQLString },
    item_desc: { type: GraphQLString },
    item_quantity: { type: GraphQLInt },
    item_image: { type: GraphQLString },
    // sales: { type: GraphQLInt },
  }),
});

// const Cart = new GraphQLObjectType({
//   name: "Cart",
//   fields: () => ({
//     itemId: { type: GraphQLString },
//     qty: { type: GraphQLInt },
//   }),
// });

// const Purchases = new GraphQLObjectType({
//   name: "Purchases",
//   fields: () => ({
//     itemId: { type: GraphQLString },
//     userId: { type: GraphQLString },
//     itemName: { type: GraphQLString },
//     itemImage: { type: GraphQLInt },
//     itemCount: { type: GraphQLFloat },
//     totalPrice: { type: GraphQLFloat },
//     qty: { type: GraphQLInt },
//     itemDescription: { type: GraphQLString },
//     giftMessage: { type: GraphQLString },
//   }),
// });

// const AuthData = new GraphQLObjectType({
//   name: "AuthData",
//   fields: () => ({
//     username: { type: GraphQLString },
//     email: { type: GraphQLString },
//     token: { type: GraphQLString },
//     tokenExpiration: { type: GraphQLInt },
//   }),
// });

module.exports = {
  User,
  Items,
  //   Cart,
  //   Purchases,
  //   AuthData,
};

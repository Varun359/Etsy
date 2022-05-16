const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    password: { type: GraphQLString },
    country: { type: GraphQLString },
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
    // sales_count: { type: GraphQLInt },
    //isFavorite: { type: GraphQLBoolean },
  }),
});

const Items_Rel = new GraphQLObjectType({
  name: "Items_Rel",
  fields: () => ({
    _id: { type: GraphQLString },
    user: { type: User },
    item_name: { type: GraphQLString },
    item_category: { type: GraphQLString },
    item_price: { type: GraphQLString },
    item_desc: { type: GraphQLString },
    item_quantity: { type: GraphQLInt },
    item_image: { type: GraphQLString },
  }),
});

const Cart = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    item_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    gift: { type: GraphQLString },
    give_gift: { type: GraphQLBoolean },
  }),
});

const Cart_Rel = new GraphQLObjectType({
  name: "Cart_Rel",
  fields: () => ({
    item: { type: Items },
    user: { type: User },
    quantity: { type: GraphQLInt },
    gift: { type: GraphQLString },
    give_gift: { type: GraphQLBoolean },
  }),
});

const Purchases = new GraphQLObjectType({
  name: "Purchases",
  fields: () => ({
    item: { type: GraphQLString },
    user: { type: GraphQLString },
    order: { type: GraphQLString },
    quantity_buyed: { type: GraphQLInt },
    price_buyed: { type: GraphQLString },
    item_name: { type: GraphQLString },
    item_image: { type: GraphQLString },
    shop_name: { type: GraphQLString },
    gift: { type: GraphQLString },
  }),
});

const Purchases_Rel = new GraphQLObjectType({
  name: "Purchases_Rel",
  fields: () => ({
    item: { type: Items },
    user: { type: User },
    order: { type: Orders },
    quantity_buyed: { type: GraphQLInt },
    price_buyed: { type: GraphQLString },
    item_name: { type: GraphQLString },
    item_image: { type: GraphQLString },
    shop_name: { type: GraphQLString },
    gift: { type: GraphQLString },
  }),
});

const Orders = new GraphQLObjectType({
  name: "Orders",
  fields: () => ({
    date: { type: GraphQLString },
  }),
});

const UserFavorites = new GraphQLObjectType({
  name: "UserFavorites",
  fields: () => ({
    item: { type: GraphQLString },
    user: { type: GraphQLString },
  }),
});
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
  Cart,
  Purchases,
  Orders,
  UserFavorites,
  Cart_Rel,
  Purchases_Rel,
  Items_Rel,
  //authData,
};

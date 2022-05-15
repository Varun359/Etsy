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
  },
});

module.exports = {
  query,
};

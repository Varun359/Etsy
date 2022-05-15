const { Customer, Items, User } = require("./TypeDef");
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
const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    editProfile: {
      type: User,
      args: {
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
      async resolve(parent, args, req) {
        console.log(args.first_name);
        if (!req.user) throw new Error("Unauthenticated user");
        console.log("User Id :::: ", req.user.user_id);

        return await usersDb.findByIdAndUpdate(
          req.user.user_id,
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
          },
          {
            new: true,
          }
        );
        // await User.findOneAndUpdate(
        //   { _id: req.user.user_id },
        //   { first_name: args.first_name },
        //   {
        //     new: true,
        //   }
        // );
        // return "User Profile Updated";

        //     UserController.updateUser(
        //       args.first_name,
        //       args.email,
        //       args.gender,
        //       args.city,
        //       args.phone_no,
        //       args.country,
        //       args.DOB,
        //       args.about,
        //       args.address
        //     );
        //     return args;
      },
    },
  },
});

module.exports = {
  mutation,
};

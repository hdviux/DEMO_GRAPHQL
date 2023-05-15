const { userControllers } = require("../controllers/Controllers");
const Router = require("graphql-router-ware");
const verifyToken = require("../middleware/verifyToken");
const resolvers = {
  Mutation: {
    signup: Router(userControllers.signup),
    login: Router(userControllers.login),
    logout: Router(verifyToken, userControllers.logout),
  },
};

module.exports = resolvers;

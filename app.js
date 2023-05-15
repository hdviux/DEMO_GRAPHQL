const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { json } = require("body-parser");
const connectDB = require("./config/connectMongo");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
connectDB();
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => ({ req, res }),
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app: app });
  app.use("/graphql", cors(), json());
  app.use("/images", express.static(path.join(__dirname, "images")));
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer(typeDefs, resolvers);

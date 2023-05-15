const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    userName: String
    email: String
    phone: String
    password: String
    gender: String
    birthday: Date
    avatar: String
    refreshToken: String
    role: Boolean
  }

  type UserLogin {
    User: User
    accessToken: String
    refreshToken: String
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    logout: String
    signup(
      userName: String
      email: String
      phone: String
      password: String
      gender: String
      birthday: Date
    ): User
    login(email: String, phone: String, password: String): UserLogin
  }
`;

module.exports = typeDefs;

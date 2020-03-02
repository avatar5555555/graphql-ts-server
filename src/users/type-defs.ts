import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: Date!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    register(email: String!, password: String!): AuthResponse
    signIn(email: String!, password: String!): AuthResponse
  }

  type AuthResponse {
    user: User!
    token: String!
    refreshToken: String!
  }
`;

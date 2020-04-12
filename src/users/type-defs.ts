import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: Date!
    emailVerified: Boolean!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    signUp(email: String!, password: String!): SignUpResponse
    confirmEmail(email: String!, code: String!): AuthResponse
    signIn(email: String!, password: String!): AuthResponse
    sendCode(email: String!): SignUpResponse
    resetPassword(
      email: String!
      newPassword: String!
      code: String!
    ): AuthResponse
  }

  type SignUpResponse {
    user: User!
  }

  type AuthResponse {
    user: User!
    token: String!
  }
`;

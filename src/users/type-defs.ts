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
      @deprecated(reason: "Use signUp")
    signUp(email: String!, password: String!): SignUpResponse
    confirmEmail(email: String!, code: String!): AuthResponse
    signIn(email: String!, password: String!): AuthResponse
  }

  type SignUpResponse {
    user: User!
  }

  type AuthResponse {
    user: User!
    token: String!
  }
`;

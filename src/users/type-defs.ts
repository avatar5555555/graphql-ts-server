import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    artworks: [Artwork!]
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    register(input: UserInput!): User!
    signIn(input: SingInInput!): User!
  }

  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  input SingInInput {
    email: String!
    password: String!
  }
`;

import { gql } from "apollo-server";

export const typeDefs = gql`
  type Artist {
    id: ID!
    firstName: String
    lastName: String
    user: User!
    artworks: [Artwork!]
  }

  type Query {
    artist(id: ID!): Artist
    artists: [Artist!]!
  }

  type Mutation {
    updateArtist(input: ArtistInput!): Artist!
  }

  input ArtistInput {
    firstName: String!
    lastName: String!
    userID: String!
  }
`;

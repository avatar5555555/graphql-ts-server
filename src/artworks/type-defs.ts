import { gql } from "apollo-server";

export const typeDefs = gql`
  enum ArtworkType {
    VIMEO
    YOUTUBE
    IMAGE
  }

  type Artwork {
    id: ID!
    name: String!
    description: String!
    type: ArtworkType!
    source: String!
    thumbnail: String
    author: User!
  }

  type Query {
    artwork(id: ID!): Artwork
    artworks: [Artwork!]!
    artworksByArtist(id: ID!): [Artwork!]!
  }

  type Mutation {
    createArtwork(input: ArtworkInput!): Artwork!
    updateArtwork(input: ArtworkInput!): Artwork!
    deleteArtwork(id: ID!): Artwork!
  }

  input ArtworkInput {
    name: String!
    description: String!
    type: ArtworkType!
    source: String!
    thumbnail: String
    authorId: String!
  }
`;

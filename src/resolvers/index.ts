import { books } from "../fixtures";

export const resolvers = {
  Query: {
    books: () => books,
  },
};

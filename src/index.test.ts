import { books } from "./fixtures";
import { resolvers } from "./resolvers";

test("resolves books", async () => {
  expect(resolvers.Query.books()).toBe(books);
});

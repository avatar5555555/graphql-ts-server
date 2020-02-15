import { defaultUser } from "./fixtures";
import { resolvers } from "./resolvers";

test("resolve user", async () => {
  expect(resolvers.Query.user("1")).toBe(defaultUser);
});

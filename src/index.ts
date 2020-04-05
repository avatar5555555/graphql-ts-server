import { ApolloServer } from "apollo-server";

import { genSchema } from "./utils/gen-schema";
import { getEmailFormToken } from "./utils/get-email-from-token";
import { store as userStore, userFabric } from "./users/resolvers";

import { User } from "resolvers-types";

const schema = genSchema();

const context = async ({ req }: any): Promise<{ user: User | null }> => {
  let user: User | null;

  try {
    const token = req.headers.authorization || "";
    const email = getEmailFormToken(token);
    const userDto = await userStore.findUserByEmail(email);

    user = userFabric.getUserFromDto(userDto!);
  } catch (error) {
    user = null;
  }

  return { user };
};

const server = new ApolloServer({
  ...schema,
  context,
});

const start = async (): Promise<void> => {
  try {
    const { url } = await server.listen();

    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.error(error);
  }
};

start();

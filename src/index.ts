/* eslint-disable promise/prefer-await-to-callbacks */
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";

import { genSchema } from "./utils/gen-schema";

// require dotenv config
dotenv.config();

const schema = genSchema();

const server = new ApolloServer({
  ...schema,
  context: ({ req }: any) => {
    return { req };
  },
});

const start = async () => {
  try {
    const { url } = await server.listen();

    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.error(error);
  }
};

start();

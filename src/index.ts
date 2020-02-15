import { ApolloServer } from "apollo-server";

import { genSchema } from "./utils/gen-schema";

const schema = genSchema();

const server = new ApolloServer(schema as any);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

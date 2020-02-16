import { ApolloServer } from "apollo-server";

import { genSchema } from "./utils/gen-schema";

const { resolvers, typeDefs } = genSchema();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

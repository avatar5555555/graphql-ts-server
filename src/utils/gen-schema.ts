import * as path from "path";

import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as glob from "glob";

export const genSchema = (): {
  typeDefs: string;
  resolvers: any;
} => {
  const pathToSources = path.join(__dirname, "../");

  const graphqlTypes = glob
    .sync(`${pathToSources}/**/type-defs.?s`)
    .map((typeDefs: string) => require(typeDefs).typeDefs);

  const resolvers = glob
    .sync(`${pathToSources}/**/resolvers.?s`)
    .map((resolver: string) => require(resolver).resolvers);

  return {
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  };
};

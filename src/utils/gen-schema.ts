import * as path from "path";

import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as glob from "glob";
import { differenceInMinutes } from "date-fns";

console.log(
  differenceInMinutes(
    new Date(2010, 0, 1, 10, 1, 59),
    new Date(2000, 0, 1, 10, 0, 0),
  ),
);

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

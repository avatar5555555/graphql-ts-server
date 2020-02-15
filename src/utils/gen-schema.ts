import * as fs from "fs";
import * as path from "path";

import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as glob from "glob";

export const genSchema = () => {
  const pathToSources = path.join(__dirname, "../");

  const graphqlTypes = glob
    .sync(`${pathToSources}/**/*.graphql`)
    .map((x) => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToSources}/**/resolvers.ts`)
    .map((resolver) => require(resolver).resolvers);

  return {
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  };
};

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value): Date {
      return new Date(value); // value from the client
    },
    serialize(value): string {
      return value.toString(); // value sent to the client
    },
    parseLiteral(ast): Date | null {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }

      return null;
    },
  }),
};

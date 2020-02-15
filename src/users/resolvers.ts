import { defaultUser } from "./fixtures";

import { User, UserResolvers } from "resolvers-types";

const register = (...args: any) => {
  console.log(args);
};

const user = (...args: any): User => {
  console.log(args);

  return defaultUser;
};

export const resolvers: UserResolvers = {
  Mutation: {
    register,
  },
  Query: {
    user,
  },
};

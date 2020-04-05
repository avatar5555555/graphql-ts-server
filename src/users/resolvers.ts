import { UserResolvers, QueryUserArgs } from "../resolvers-types";
import { db } from "../db";

import { Repository } from "./repository";
import { AuthService } from "./auth.service";
import { UserFabric } from "./user.entity";
import { UserInput } from "./types";

export const store = new Repository(db);
export const userFabric = new UserFabric();
export const authService = new AuthService(store, userFabric);

const signUp = (_: any, args: UserInput) => {
  return authService.signUp(args);
};

const signIn = (_: any, args: UserInput) => {
  return authService.signIn(args);
};

const me = (_: any, __: any, context: any) => {
  return authService.me(context);
};

const user = async (_: any, args: QueryUserArgs) => {
  console.log(args);
};

export const resolvers: UserResolvers = {
  Mutation: {
    signUp,
    signIn,
  },
  Query: {
    user,
    me,
  },
};

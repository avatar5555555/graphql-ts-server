import { UserResolvers, QueryUserArgs } from "../resolvers-types";
import { db } from "../db";

import { Repository } from "./user.repository";
import { AuthService } from "./auth.service";
import { UserFabric } from "./user.entity";
import { UserInput, ConfirmEmailInput } from "./user.types";

export const store = new Repository(db);
export const userFabric = new UserFabric();
export const authService = new AuthService(store, userFabric);

const register = (
  _: any,
  args: UserInput,
): ReturnType<typeof authService.register> => {
  return authService.register(args);
};

const confirmEmail = (_: any, args: ConfirmEmailInput): void => {
  console.log(args);
};

const signUp = (
  _: any,
  args: UserInput,
): ReturnType<typeof authService.signUp> => {
  return authService.signUp(args);
};

const signIn = (
  _: any,
  args: UserInput,
): ReturnType<typeof authService.signIn> => {
  return authService.signIn(args);
};

const me = (
  _: any,
  __: any,
  context: any,
): ReturnType<typeof authService.me> => {
  return authService.me(context);
};

const user = async (_: any, args: QueryUserArgs): Promise<void> => {
  console.log(args);
};

export const resolvers: UserResolvers = {
  Mutation: {
    register,
    confirmEmail,
    signUp,
    signIn,
  },
  Query: {
    me,
    user,
  },
};

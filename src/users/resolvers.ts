import { UserResolvers, QueryUserArgs } from "../resolvers-types";
import { db } from "../db";
import { CodeService } from "../codes/code.service";
import { CodeFabric } from "../codes/code.entity";
import { Repository as CodeRepository } from "../codes/code.repository";
import { EmailService } from "../email/email.service";
import { EmailTransport } from "../email/email.transport";
import { appConfig } from "../app-config";
import { EmailStub } from "../email/email.stub";

import { Repository } from "./user.repository";
import { AuthService } from "./auth.service";
import { UserFabric } from "./user.entity";
import { UserInput, ConfirmEmailInput } from "./user.types";

// user service
export const store = new Repository(db);
export const userFabric = new UserFabric();

// code service
const codeFabric = new CodeFabric();
const codeRepository = new CodeRepository(db);
const codeService = new CodeService(codeRepository, codeFabric);

// email service
let emailTransport: EmailStub | EmailTransport = new EmailTransport();

if (appConfig.useEmailStub) {
  emailTransport = new EmailStub();
}

const emailService = new EmailService(emailTransport);

export const authService = new AuthService(
  store,
  userFabric,
  codeService,
  emailService,
);

const register = (
  _: any,
  args: UserInput,
): ReturnType<typeof authService.register> => {
  return authService.register(args);
};

const confirmEmail = (
  _: any,
  args: ConfirmEmailInput,
): ReturnType<typeof authService.confirmEmail> => {
  return authService.confirmEmail(args);
};

const sendCode = (
  _: any,
  args: { email: string },
): ReturnType<typeof authService.sendCode> => {
  return authService.sendCode(args.email);
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
    sendCode,
    signUp,
    signIn,
  },
  Query: {
    me,
    user,
  },
};

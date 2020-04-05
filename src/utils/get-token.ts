import { sign } from "jsonwebtoken";

import { appConfig } from "../app-config";

import { User } from "resolvers-types";

export const getTokens = ({ id, email }: User): string => {
  const token = sign({ id, email }, appConfig.tokenSecret, {
    expiresIn: appConfig.tokenExpiresIn,
  });

  return token;
};

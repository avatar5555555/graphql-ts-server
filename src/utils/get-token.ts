import { sign } from "jsonwebtoken";

import { appConfig } from "../app-config";

import { User } from "resolvers-types";

export const getToken = ({ id, email }: User): string => {
  const token = sign({ id, email }, appConfig.tokenSecret, {
    expiresIn: appConfig.tokenExpiresIn,
  });

  return token;
};

import { sign } from "jsonwebtoken";

import { config } from "../config";

import { User } from "resolvers-types";

export const getTokens = ({ id, email }: User): string => {
  const token = sign({ id, email }, config.tokenSecret, {
    expiresIn: config.expiresIn,
  });

  return token;
};

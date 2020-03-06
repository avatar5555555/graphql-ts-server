import { sign } from "jsonwebtoken";

import { User } from "resolvers-types";
import { config } from "config";

export const getTokens = ({ id, email }: User): string => {
  const token = sign({ id, email }, config.tokenSecret, {
    expiresIn: config.expiresIn,
  });

  return token;
};

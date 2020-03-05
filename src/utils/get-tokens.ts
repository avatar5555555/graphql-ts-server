import { sign } from "jsonwebtoken";

import { Tokens } from "./types";

import { User } from "resolvers-types";

export const getTokens = ({ id, email }: User): Tokens => {
  const token = sign({ id, email }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15min",
  });

  const refreshToken = sign(
    { id, email },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "30d" },
  );

  return { token, refreshToken };
};

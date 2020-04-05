import { Config } from "./types";

export const config: Config = {
  expiresIn: "60min",
  tokenSecret: process.env["ACCESS_TOKEN_SECRET"] as string,
  pgUser: process.env["PGUSER"] as string,
  pgHost: process.env["PGHOST"] as string,
  pgPassword: process.env["PGPASSWORD"] as string,
  db: process.env["PGDATABASE"] as string,
  dbPort: Number(process.env["PGPORT"]),
  codeExpiresIn: 10, //minutes
};

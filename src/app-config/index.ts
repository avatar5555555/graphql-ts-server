import dotenv from "dotenv";

import { Config } from "./types";

dotenv.config();

export const appConfig: Config = {
  tokenExpiresIn: "60min",
  tokenSecret: process.env["ACCESS_TOKEN_SECRET"] as string,
  pgUser: process.env["PGUSER"] as string,
  pgHost: process.env["PGHOST"] as string,
  pgPassword: process.env["PGPASSWORD"] as string,
  db: process.env["PGDATABASE"] as string,
  dbPort: Number(process.env["PGPORT"]),
  codeExpiresIn: 10,
  senderEmail: process.env["SENDER"] as string,
  charset: "UTF-8",
  useEmailStub: (process.env["USE_EMAIL_STUB"] as string) === "true",
};

console.log(appConfig);

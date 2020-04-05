import { Pool } from "pg";

import { appConfig } from "../app-config";

export const db = new Pool({
  user: appConfig.pgUser,
  host: appConfig.pgHost,
  database: appConfig.db,
  password: appConfig.pgPassword,
  port: appConfig.dbPort,
});

import { Pool } from "pg";

import { config } from "../config";

export const db = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.db,
  password: config.pgPassword,
  port: config.dbPort,
});

import config from "config";

import { Config } from "./types";

export const appConfig: Config = config.get("app");

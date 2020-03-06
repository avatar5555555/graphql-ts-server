export interface Config {
  expiresIn: string;
  tokenSecret: string;
  pgUser: string;
  pgHost: string;
  pgPassword: string;
  db: string;
  dbPort: number;
}

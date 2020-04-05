export interface Config {
  tokenExpiresIn: string;
  tokenSecret: string;
  pgUser: string;
  pgHost: string;
  pgPassword: string;
  db: string;
  dbPort: number;
  codeExpiresIn: number;
  senderEmail: string;
  charset: string;
  useEmailStub: boolean;
}

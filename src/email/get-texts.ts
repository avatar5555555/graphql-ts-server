import { appConfig } from "../app-config";

export const getText = (code: string): string =>
  `Your code is ${code}. It's active for ${appConfig.codeExpiresIn}min`;

export const getHtml = (code: string): string =>
  `<p>Your code is <b>${code}</b>. It's active for ${appConfig.codeExpiresIn}min</p>`;

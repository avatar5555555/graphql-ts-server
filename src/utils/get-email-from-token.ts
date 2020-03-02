import { verify } from "jsonwebtoken";

export const getEmailFormToken = (token: string): string => {
  try {
    const formattedToken = token.replace("Bearer ", "");

    const { email } = verify(
      formattedToken,
      process.env["ACCESS_TOKEN_SECRET"] as string,
    ) as any;

    return email;
  } catch {
    return "";
  }
};

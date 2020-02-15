import * as yup from "yup";

export const passwordSchema = yup
  .string()
  .min(5)
  .max(15)
  .required();

export const generateCode = (
  max: number = 100000,
  min: number = 999999,
): string => {
  return Math.ceil(Math.random() * (max - min) + min).toString();
};

import isObject from "lodash/isObject";
import camelCase from "lodash/camelCase";
import isDate from "lodash/isDate";

type Dictionary = { [key: string]: any };

export const getCamelCaseObject = (obj: Dictionary): Dictionary => {
  if (!obj) {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    let value = obj[key];
    const isValueObject = isObject(value);
    const isValueDate = isDate(value);

    if (isValueObject && !isValueDate) {
      value = getCamelCaseObject(value);
    }

    acc[camelCase(key)] = value;

    return acc;
  }, {} as Dictionary) as Dictionary;
};

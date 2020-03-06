import * as bcrypt from "bcryptjs";

import { User } from "../resolvers-types";
import { getCamelCaseObject } from "../utils/get-camel-case-object";

import { UserDto, UserInput } from "./types";

export class UserEntity {
  email: string;
  salt: string;
  password: string;
  createdAt: Date;

  constructor(user: Omit<UserDto, "id" | "created_at">) {
    this.email = user.email;
    this.salt = user.salt;
    this.password = user.password;
    this.createdAt = new Date();
  }
}

export class UserFabric {
  constructor() {}

  getNewUserEntity = async (userInput: UserInput): Promise<UserEntity> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userInput.password, salt);

    return new UserEntity({
      ...userInput,
      salt,
      password: hash,
    });
  };

  getUserFromDto = (userDto: UserDto): User => {
    // eslint-disable-next-line
    const { password: _, salt: __, ...user } = userDto;

    return getCamelCaseObject(user) as User;
  };
}

import * as bcrypt from "bcryptjs";

import { User } from "../resolvers-types";
import { getCamelCaseObject } from "../utils/get-camel-case-object";

import { UserDto, UserInput } from "./user.types";

export class UserEntity {
  email: string;
  salt: string;
  password: string;
  createdAt: Date;

  constructor(user: Omit<UserDto, "id" | "created_at" | "email_verified">) {
    this.email = user.email;
    this.salt = user.salt;
    this.password = user.password;
    this.createdAt = new Date();
  }
}

export class UserFabric {
  constructor() {}

  getSaltAndHash = async (
    newPassword: string,
  ): Promise<{ salt: string; hash: string }> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newPassword, salt);

    return { salt, hash };
  };

  getNewUserEntity = async (userInput: UserInput): Promise<UserEntity> => {
    const { salt, hash } = await this.getSaltAndHash(userInput.password);

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

import { Pool } from "pg";

import { UserRepository, UserDto, UserInput } from "./types";
import { UserEntity } from "./user.entity";

const selectUserByEmailQuery = "SELECT * FROM users WHERE users.email = $1";

const signUpQuery =
  "INSERT INTO USERS(email, salt, password, created_at) VALUES($1, $2, $3, $4) RETURNING *";

export class Repository implements UserRepository {
  private store: Pool;
  constructor(store: Pool) {
    this.store = store;
  }

  findUserByEmail = async (email: string): Promise<UserDto | undefined> => {
    const response = await this.store.query<UserDto>(selectUserByEmailQuery, [
      email,
    ]);

    const [user] = response.rows;

    return user;
  };

  signUp = async (userEntity: UserEntity) => {
    const result = await this.store.query<UserDto>(signUpQuery, [
      userEntity.email,
      userEntity.salt,
      userEntity.password,
      userEntity.createdAt,
    ]);

    const [user] = result.rows;

    return user;
  };

  signIn = async (userInput: UserInput) => {
    return this.findUserByEmail(userInput.email);
  };
}

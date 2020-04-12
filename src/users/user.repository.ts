import { Pool } from "pg";

import {
  UserRepository,
  UserDto,
  UserInput,
  MaybeUserDto,
  UpdatePasswordInput,
} from "./user.types";
import { UserEntity } from "./user.entity";

const selectUserByEmailQuery = "SELECT * FROM users WHERE users.email = $1";

const signUpQuery =
  "INSERT INTO USERS(email, salt, password, created_at) VALUES($1, $2, $3, $4) RETURNING *";

const confirmEmailQuery =
  "UPDATE users SET email_verified = true WHERE id = $1";

const updatePasswordQuery =
  "UPDATE users SET salt = $2, password = $3 WHERE id = $1";

export class Repository implements UserRepository {
  constructor(private store: Pool) {}

  findUserByEmail = async (email: string): Promise<UserDto | undefined> => {
    const response = await this.store.query<UserDto>(selectUserByEmailQuery, [
      email,
    ]);

    const [user] = response.rows;

    return user;
  };

  signUp = async (userEntity: UserEntity): MaybeUserDto => {
    const result = await this.store.query<UserDto>(signUpQuery, [
      userEntity.email,
      userEntity.salt,
      userEntity.password,
      userEntity.createdAt,
    ]);

    const [user] = result.rows;

    return user;
  };

  signIn = async (userInput: UserInput): MaybeUserDto => {
    return this.findUserByEmail(userInput.email);
  };

  confirmEmail = async (useId: string): Promise<void> => {
    await this.store.query(confirmEmailQuery, [useId]);
  };

  updatePassword = async ({
    userId,
    salt,
    newPassword,
  }: UpdatePasswordInput): Promise<void> => {
    await this.store.query(updatePasswordQuery, [userId, salt, newPassword]);
  };
}

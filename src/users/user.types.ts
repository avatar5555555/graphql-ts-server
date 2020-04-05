import Maybe from "graphql/tsutils/Maybe";

import { UserEntity } from "./user.entity";

export type MaybeUserDto = Promise<Maybe<UserDto>>;
// type MaybeUser = Promise<UserDto | undefined>;

export interface UserInput {
  email: string;
  password: string;
}

export interface UserRepository {
  signUp: (userEntity: UserEntity) => MaybeUserDto;
  signIn: (userInput: UserInput) => MaybeUserDto;
  findUserByEmail: (email: string) => MaybeUserDto;
}

export interface UserDto {
  id: string;
  email: string;
  password: string;
  salt: string;
  created_at: Date;
}

export interface ConfirmEmailInput {
  email: string;
  code: string;
}

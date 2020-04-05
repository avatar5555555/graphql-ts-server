import { UserEntity } from "./user.entity";

type MaybeUser = Promise<UserDto | undefined>;

export interface UserInput {
  email: string;
  password: string;
}

export interface UserRepository {
  signUp: (userEntity: UserEntity) => Promise<UserDto>;
  signIn: (userInput: UserInput) => MaybeUser;
  findUserByEmail: (email: string) => MaybeUser;
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

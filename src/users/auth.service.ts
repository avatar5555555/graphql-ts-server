import { UserInputError, AuthenticationError } from "apollo-server";
import * as bcrypt from "bcryptjs";

import { User, AuthResponse, SignUpResponse, Maybe } from "../resolvers-types";
import { getTokens } from "../utils/get-token";
import { passwordSchema } from "../validation-schemas/password-schema";
import { emailSchema } from "../validation-schemas/email-schema";

import { UserRepository, UserInput } from "./user.types";
import { UserFabric } from "./user.entity";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userFabric: UserFabric,
  ) {}
  // TODO: remove after client migration
  register = async (
    userInput: UserInput,
  ): Promise<AuthResponse | never | undefined> => {
    this.validateCredentials(userInput.email, userInput.password);

    const userExist = await this.checkIfEmailExists(userInput.email);

    if (userExist) {
      throw new UserInputError("Email already exists");
    }

    const userEntity = await this.userFabric.getNewUserEntity(userInput);

    const userDto = await this.userRepository.signUp(userEntity);

    if (userDto) {
      const user = this.userFabric.getUserFromDto(userDto);
      const token = getTokens(user);

      return { user, token };
    }

    return;
  };

  signUp = async (
    userInput: UserInput,
  ): Promise<SignUpResponse | never | undefined> => {
    this.validateCredentials(userInput.email, userInput.password);

    const userExist = await this.checkIfEmailExists(userInput.email);

    if (userExist) {
      throw new UserInputError("Email already exists");
    }

    const userEntity = await this.userFabric.getNewUserEntity(userInput);

    const userDto = await this.userRepository.signUp(userEntity);

    if (userDto) {
      const user = this.userFabric.getUserFromDto(userDto);

      return { user };
    }

    return;
  };

  signIn = async (userInput: UserInput): Promise<AuthResponse | never> => {
    let isValidCredentials = false;
    const userDto = await this.userRepository.signIn(userInput);

    if (userDto) {
      isValidCredentials = await this.validatePassword(
        userInput.password,
        userDto.salt,
        userDto.password,
      );
    }

    if (isValidCredentials && userDto) {
      const user = this.userFabric.getUserFromDto(userDto);
      const token = getTokens(user);

      return { user, token };
    }

    throw new AuthenticationError("Password or email is incorrect");
  };

  me = async ({ user }: { user: User | null }): Promise<Maybe<User>> => {
    if (user) {
      return user;
    }

    throw new AuthenticationError("User is not authenticated");
  };

  private checkIfEmailExists = async (email: string): Promise<boolean> => {
    const userDto = await this.userRepository.findUserByEmail(email);

    return Boolean(userDto);
  };

  private validatePassword = async (
    password: string,
    salt: string,
    currentHash: string,
  ): Promise<boolean> => {
    const hash = await bcrypt.hash(password, salt);

    return hash === currentHash;
  };

  private validateCredentials = (email: string, password: string): void => {
    const isEmailValid = emailSchema.isValidSync(email);
    const isPasswordValid = passwordSchema.isValidSync(password);

    if (!isEmailValid || !isPasswordValid) {
      throw new UserInputError("Unprocessable Entity");
    }
  };
}

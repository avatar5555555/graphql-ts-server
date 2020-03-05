import { UserInputError, AuthenticationError } from "apollo-server";
import * as bcrypt from "bcryptjs";

import { User, AuthResponse } from "../resolvers-types";
import { getTokens } from "../utils/get-tokens";
import { passwordSchema } from "../validation-schemas/password-schema";
import { emailSchema } from "../validation-schemas/email-schema";

import { UserRepository, UserInput } from "./types";
import { UserFabric } from "./user.entity";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userFabric: UserFabric,
  ) {}

  signUp = async (userInput: UserInput): Promise<AuthResponse | never> => {
    this.validateCredentials(userInput.email, userInput.password);

    const userExist = await this.checkIfEmailExists(userInput.email);

    if (userExist) {
      throw new UserInputError("Email already exists");
    }

    const userEntity = await this.userFabric.getNewUserEntity(userInput);

    const userDto = await this.userRepository.signUp(userEntity);
    const user = this.userFabric.getUserFromDto(userDto);
    const tokens = getTokens(user);

    return { user, ...tokens };
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
      const tokens = getTokens(user);

      return { user, ...tokens };
    }

    throw new AuthenticationError("Password or email is incorrect");
  };

  me = async ({ user }: { user: User | null }) => {
    if (user) {
      return user;
    }

    throw new AuthenticationError("User is not authenticated");
  };

  checkIfEmailExists = async (email: string): Promise<boolean> => {
    const userDto = await this.userRepository.findUserByEmail(email);

    return Boolean(userDto);
  };

  validatePassword = async (
    password: string,
    salt: string,
    currentHash: string,
  ) => {
    const hash = await bcrypt.hash(password, salt);

    return hash === currentHash;
  };

  validateCredentials = (email: string, password: string) => {
    const isEmailValid = emailSchema.isValidSync(email);
    const isPasswordValid = passwordSchema.isValidSync(password);

    if (!isEmailValid || !isPasswordValid) {
      throw new UserInputError("Unprocessable Entity");
    }
  };
}

import { UserInputError, AuthenticationError } from "apollo-server";
import * as bcrypt from "bcryptjs";

import { User, AuthResponse, SignUpResponse, Maybe } from "../resolvers-types";
import { getTokens } from "../utils/get-token";
import { passwordSchema } from "../validation-schemas/password-schema";
import { emailSchema } from "../validation-schemas/email-schema";
import { EmailService } from "../email/email.service";

import { UserRepository, UserInput, ConfirmEmailInput } from "./user.types";
import { UserFabric } from "./user.entity";

import { CodeService } from "codes/code.service";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userFabric: UserFabric,
    private codeService: CodeService,
    private emailService: EmailService,
  ) {}
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

  private validateEmail = (email: string): never | void => {
    const isEmailValid = emailSchema.isValidSync(email);

    if (!isEmailValid) {
      throw new UserInputError("Unprocessable Entity");
    }
  };

  private validateCredentials = (email: string, password: string): void => {
    const isEmailValid = emailSchema.isValidSync(email);
    const isPasswordValid = passwordSchema.isValidSync(password);

    if (!isEmailValid || !isPasswordValid) {
      throw new UserInputError("Unprocessable Entity");
    }
  };

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

  confirmEmail = async (
    codeInput: ConfirmEmailInput,
  ): Promise<AuthResponse | never | undefined> => {
    this.validateEmail(codeInput.email);

    const userDto = await this.userRepository.findUserByEmail(codeInput.email);

    if (userDto) {
      const user = this.userFabric.getUserFromDto(userDto);
      const codeEntity = await this.codeService.getActiveCode(user.id);
      const token = getTokens(user);

      if (codeInput.code !== codeEntity?.code) {
        throw new UserInputError("Unprocessable Entity");
      }

      return { user, token };
    }

    return;
  };

  sendCode = async (
    email: string,
  ): Promise<SignUpResponse | never | undefined> => {
    this.validateEmail(email);
    const userDto = await this.userRepository.findUserByEmail(email);

    if (!userDto) {
      throw new UserInputError("Unprocessable Entity");
    }

    const user = this.userFabric.getUserFromDto(userDto);
    const codeEntity = await this.codeService.getActiveCode(user.id);

    this.emailService.sendCode(user.email, codeEntity?.code ?? "");

    return { user };
  };
}

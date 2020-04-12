import { UserInputError, AuthenticationError } from "apollo-server";
import * as bcrypt from "bcryptjs";

import { User, AuthResponse, SignUpResponse } from "../resolvers-types";
import { getToken } from "../utils/get-token";
import { passwordSchema } from "../validation-schemas/password-schema";
import { emailSchema } from "../validation-schemas/email-schema";
import { EmailService } from "../email/email.service";
import { CodeService } from "../codes/code.service";
import { ErrorCode } from "../error-code";

import {
  UserRepository,
  UserInput,
  ConfirmEmailInput,
  MaybeUserDto,
  ResetPasswordInput,
} from "./user.types";
import { UserFabric } from "./user.entity";

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
      throw new UserInputError(ErrorCode.UnprocessableEntity);
    }
  };

  private getUserDto = async (email: string): MaybeUserDto | never => {
    this.validateEmail(email);
    const userDto = await this.userRepository.findUserByEmail(email);

    if (!userDto) {
      throw new UserInputError(ErrorCode.UnprocessableEntity);
    }

    return userDto;
  };

  private validateCredentials = (email: string, password: string): void => {
    const isEmailValid = emailSchema.isValidSync(email);
    const isPasswordValid = passwordSchema.isValidSync(password);

    if (!isEmailValid || !isPasswordValid) {
      throw new UserInputError(ErrorCode.UnprocessableEntity);
    }
  };

  signUp = async (userInput: UserInput): Promise<SignUpResponse | never> => {
    this.validateCredentials(userInput.email, userInput.password);

    const userExist = await this.checkIfEmailExists(userInput.email);

    if (userExist) {
      throw new UserInputError(ErrorCode.EmailAlreadyExists);
    }

    const userEntity = await this.userFabric.getNewUserEntity(userInput);

    const userDto = await this.userRepository.signUp(userEntity);

    const user = this.userFabric.getUserFromDto(userDto!);

    return { user };
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
      const token = getToken(user);

      return { user, token };
    }

    throw new AuthenticationError(ErrorCode.InvalidCredentials);
  };

  me = async ({ user }: { user: User | null }): Promise<User | never> => {
    if (user) {
      return user;
    }

    throw new AuthenticationError(ErrorCode.UnauthenticatedUser);
  };

  confirmEmail = async (
    codeInput: ConfirmEmailInput,
  ): Promise<AuthResponse | never> => {
    const userDto = await this.getUserDto(codeInput.email);

    const user = this.userFabric.getUserFromDto(userDto!);
    const codeEntity = await this.codeService.getActiveCode(user.id);
    const token = getToken(user);

    if (codeInput.code !== codeEntity?.code) {
      throw new UserInputError(ErrorCode.UnprocessableEntity);
    }

    await this.userRepository.confirmEmail(user.id);
    await this.codeService.deleteCode(user.id);

    return { user, token };
  };

  sendCode = async (email: string): Promise<SignUpResponse | never> => {
    const userDto = await this.getUserDto(email);

    const user = this.userFabric.getUserFromDto(userDto!);
    const codeEntity = await this.codeService.getActiveCode(user.id);

    this.emailService.sendCode(user.email, codeEntity?.code ?? "");

    return { user };
  };

  resetPassword = async (
    resetPasswordInput: ResetPasswordInput,
  ): Promise<AuthResponse | never> => {
    const userDto = await this.getUserDto(resetPasswordInput.email);
    const user = this.userFabric.getUserFromDto(userDto!);
    const codeEntity = await this.codeService.getActiveCode(user.id);

    if (codeEntity?.code !== resetPasswordInput.code) {
      throw new UserInputError(ErrorCode.UnprocessableEntity);
    }

    const { salt, hash } = await this.userFabric.getSaltAndHash(
      resetPasswordInput.newPassword,
    );

    await this.userRepository.updatePassword({
      userId: user.id,
      newPassword: hash,
      salt,
    });
    await this.codeService.deleteCode(user.id);
    const token = getToken(user);

    return { user, token };
  };
}

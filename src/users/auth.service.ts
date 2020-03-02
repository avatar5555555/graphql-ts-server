import { UserInputError, AuthenticationError } from "apollo-server";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User, AuthResponse } from "../resolvers-types";
import { getEmailFormToken } from "../utils/get-email-from-token";

import { UserRepository, UserInput, Tokens, UserDto } from "./types";
import { UserFabric } from "./user.entity";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userFabric: UserFabric,
  ) {}

  signUp = async (userInput: UserInput): Promise<AuthResponse | never> => {
    const userExist = await this.checkIfEmailExists(userInput.email);

    if (userExist) {
      throw new UserInputError("Email already exists");
    }

    const userEntity = await this.userFabric.getNewUserEntity(userInput);

    const userDto = await this.userRepository.signUp(userEntity);
    const user = this.userFabric.getUserFromDto(userDto);
    const tokens = this.getTokens(user);

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
      const tokens = this.getTokens(user);

      return { user, ...tokens };
    }

    throw new AuthenticationError("Password or email is incorrect");
  };

  me = async (req: any) => {
    const isUserValid = await this.verifyToken(req);

    if (isUserValid) {
      const token = req.headers.authorization || "";
      const email = getEmailFormToken(token);

      const userDto = (await this.userRepository.findUserByEmail(
        email,
      )) as UserDto;

      const user = this.userFabric.getUserFromDto(userDto);

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

  verifyToken = async (req: any) => {
    const token = req.headers.authorization || "";

    const email = getEmailFormToken(token);

    return await this.checkIfEmailExists(email);
  };

  getTokens = ({ id, email }: User): Tokens => {
    const token = sign(
      { id, email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15min" },
    );

    const refreshToken = sign(
      { id, email },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "30d" },
    );

    return { token, refreshToken };
  };
}

import { AuthenticationError, UserInputError } from "apollo-server";

import { CodeFabric } from "../codes/code.entity";
import { CodeService } from "../codes/code.service";
import { EmailService } from "../email/email.service";
import { CodeRepositoryStub } from "../codes/test-helpers";
import { EmailStub } from "../email/email.stub";
import { ErrorCode } from "../error-code";

import { AuthService } from "./auth.service";
import { UserFabric } from "./user.entity";
import { UserRepositoryStub } from "./test-helpers";

const email = "a@a.a";
const password = "123456";

describe("auth service", () => {
  let authService: AuthService;
  let userRepositoryStub: UserRepositoryStub;
  const userFabric = new UserFabric();

  // code service
  const codeFabric = new CodeFabric();
  const codeRepositoryStub = new CodeRepositoryStub();
  const codeService = new CodeService(codeRepositoryStub, codeFabric);

  // email service
  const emailTransport = new EmailStub();
  const emailService = new EmailService(emailTransport);

  beforeEach(() => {
    userRepositoryStub = new UserRepositoryStub();
    authService = new AuthService(
      userRepositoryStub,
      userFabric,
      codeService,
      emailService,
    );
  });

  it("creates a user", async () => {
    const data = await authService.signUp({ email, password });

    expect(data!.user.email).toEqual(email);
  });

  it("login", async () => {
    const data = await authService.signUp({ email, password });
    const data2 = await authService.signIn({ email, password });

    expect(data!.user.email).toEqual(data2.user.email);
  });

  it("doesn't login with invalid credentials", async () => {
    await authService.signUp({ email, password });

    await expect(
      authService.signIn({ email, password: "invalidPassword" }),
    ).rejects.toThrowError(
      new AuthenticationError(ErrorCode.InvalidCredentials),
    );
  });

  it("doesn't registers with exist email", async () => {
    await authService.signUp({ email, password });

    await expect(authService.signUp({ email, password })).rejects.toThrowError(
      new UserInputError(ErrorCode.EmailAlreadyExists),
    );
  });

  it("me works", async () => {
    const data = await authService.signUp({ email, password });
    const data2 = await authService.me(data!);

    expect(data!.user.email).toEqual(data2!.email);
  });

  it("confirms email", async () => {
    const data = await authService.signUp({ email, password });

    await authService.sendCode(email);
    const codeDto = codeRepositoryStub.store[data?.user.id as string];

    await authService.confirmEmail({ email, code: codeDto.code });
    const data2 = await authService.signIn({ email, password });

    expect(data2!.user.emailVerified).toBeTruthy();
  });

  it("resets password", async () => {
    const data = await authService.signUp({ email, password });

    await authService.sendCode(email);
    const codeDto = codeRepositoryStub.store[data?.user.id as string];

    await authService.resetPassword({
      email,
      newPassword: "newPassword",
      code: codeDto.code,
    });

    await expect(authService.signIn({ email, password })).rejects.toThrowError(
      new AuthenticationError(ErrorCode.InvalidCredentials),
    );
  });

  it("doesn't resets with wrong code", async () => {
    await authService.signUp({ email, password });

    await authService.sendCode(email);

    await expect(
      authService.resetPassword({
        email,
        newPassword: "newPassword",
        code: "111111",
      }),
    ).rejects.toThrowError(new UserInputError(ErrorCode.UnprocessableEntity));
  });
});

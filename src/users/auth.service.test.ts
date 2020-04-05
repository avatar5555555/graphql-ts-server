import { CodeFabric } from "../codes/code.entity";
import { CodeService } from "../codes/code.service";
import { EmailService } from "../email/email.service";
import { CodeRepositoryStub } from "../codes/test-helpers";
import { EmailStub } from "../email/email.stub";

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
});

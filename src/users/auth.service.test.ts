import { AuthService } from "./auth.service";
import { UserFabric } from "./user.entity";
import { UserRepository, UserDto } from "./user.types";

let store: UserDto[] = [];
let id = 0;
const email = "a@a.a";
const password = "123456";

const userRepositoryMock: UserRepository = {
  signIn: (userEntity) => {
    const user = store.find((users) => users.email === userEntity.email);

    return Promise.resolve(user);
  },
  signUp: ({ createdAt, ...rest }) => {
    const user = { ...rest, created_at: createdAt, id: `${id + 1}` };

    store.push(user);

    return Promise.resolve(user);
  },
  findUserByEmail: (email) => {
    const user = store.find((users) => users.email === email);

    return Promise.resolve(user);
  },
};

describe("auth service", () => {
  let authService: AuthService;
  const userFabric = new UserFabric();

  beforeEach(() => {
    store = [];
    authService = new AuthService(userRepositoryMock, userFabric);
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
});

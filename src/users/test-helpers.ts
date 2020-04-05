import { UserRepository, UserDto, MaybeUserDto, UserInput } from "./user.types";
import { UserEntity } from "./user.entity";

export class UserRepositoryStub implements UserRepository {
  store: UserDto[] = [];
  userId = 0;

  signIn = (useInput: UserInput): MaybeUserDto => {
    const user = this.store.find((users) => users.email === useInput.email);

    return Promise.resolve(user) as MaybeUserDto;
  };

  signUp = ({ createdAt, ...rest }: UserEntity): MaybeUserDto => {
    const user = {
      ...rest,
      created_at: createdAt,
      id: `${this.userId + 1}`,
      email_verified: false,
    };

    this.store.push(user);

    return Promise.resolve(user);
  };

  findUserByEmail = (email: string): MaybeUserDto => {
    const user = this.store.find((users) => users.email === email);

    return Promise.resolve(user);
  };

  confirmEmail = (userId: string): Promise<void> => {
    this.store = this.store.map((user: UserDto) => {
      if (user.id !== userId) {
        return user;
      }

      return { ...user, email_verified: true };
    });

    return Promise.resolve();
  };
}

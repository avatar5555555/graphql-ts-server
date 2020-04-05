import { CodeRepository, MaybeCodeDto, CodeDto } from "./code.types";
import { CodeEntity } from "./code.entity";

export class CodeRepositoryStub implements CodeRepository {
  __store: { [key: string]: CodeDto } = {};
  id = 0;

  get store(): { [key: string]: CodeDto } {
    return this.__store;
  }

  set store(newStore: { [key: string]: CodeDto }) {
    this.__store = newStore;
  }

  addCode = (codeInput: CodeEntity): MaybeCodeDto => {
    const codeDto: CodeDto = {
      created_at: codeInput.createdAt,
      user_id: codeInput.userId,
      id: this.id.toString(),
      code: codeInput.code,
    };

    this.__store[codeInput.userId] = codeDto;
    this.id = this.id + 1;

    return Promise.resolve(codeDto);
  };

  deleteCodeByUserId = (userId: string): MaybeCodeDto => {
    const { [userId]: codeDto, ...rest } = this.__store;

    this.__store = rest;

    return Promise.resolve(codeDto);
  };

  findByUserId = (userId: string): MaybeCodeDto => {
    return Promise.resolve(this.__store[userId]);
  };
}

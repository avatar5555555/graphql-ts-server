import { differenceInMinutes } from "date-fns";

import { CodeService } from "./code.service";
import { CodeRepository, CodeDto } from "./code.types";
import { CodeFabric } from "./code.entity";

let store: CodeDto[] = [];
let id = 0;

const codeFabric = new CodeFabric();

const repository: CodeRepository = {
  addCode: (codeEntity) => {
    const codeDto = {
      user_id: codeEntity.userId,
      created_at: codeEntity.createdAt,
      code: codeEntity.code,
      id: id.toString(),
    };

    id = id + 1;

    store.push(codeDto);

    return Promise.resolve(codeDto);
  },
  deleteCodeByUserId: (userId: string) => {
    const codeDto = store.find((code) => code.user_id === userId);

    store = store.filter((code) => code.user_id !== userId);

    return Promise.resolve(codeDto);
  },

  findByUserId: (userId: string) => {
    const codeDto = store.find((code) => code.user_id === userId);

    return Promise.resolve(codeDto);
  },
};

jest.mock("date-fns", () => ({
  differenceInMinutes: jest.fn(),
}));

describe("code", () => {
  beforeEach(() => {
    store = [];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("the creates a user", async () => {
    const codeService = new CodeService(repository, codeFabric);
    const formattedId = id.toString();

    await codeService.getCode(formattedId);
    expect(store[0].user_id).toEqual(formattedId);
  });

  it("returns the old code", async () => {
    const codeService = new CodeService(repository, codeFabric);
    const formattedId = id.toString();

    (differenceInMinutes as any).mockReturnValueOnce(1);

    const oldCode = await codeService.getCode(formattedId);
    const newCode = await codeService.getCode(formattedId);

    expect(oldCode?.code).toBeDefined();
    expect(newCode?.code).toBeDefined();
    expect(oldCode?.code).toEqual(newCode?.code);
  });

  it("returns a new code and deletes the old one ", async () => {
    const codeService = new CodeService(repository, codeFabric);
    const formattedId = id.toString();

    const oldCode = await codeService.getCode(formattedId);

    (differenceInMinutes as any).mockReturnValueOnce(11);

    const newCode = await codeService.getCode(formattedId);

    expect(oldCode?.code).toBeDefined();
    expect(newCode?.code).toBeDefined();
    expect(oldCode?.code).not.toEqual(newCode?.code);

    const deletedCode = store.find((code) => code.id === oldCode?.id);

    expect(deletedCode).toBeUndefined();
  });
});

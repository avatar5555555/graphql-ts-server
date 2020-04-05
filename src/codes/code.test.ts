import { differenceInMinutes } from "date-fns";

import { CodeService } from "./code.service";
import { CodeFabric } from "./code.entity";
import { CodeRepositoryStub } from "./test-helpers";

const codeFabric = new CodeFabric();

jest.mock("date-fns", () => ({
  differenceInMinutes: jest.fn(),
}));

let codeRepositoryStub: CodeRepositoryStub;

describe("code", () => {
  beforeEach(() => {
    codeRepositoryStub = new CodeRepositoryStub();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("creates a code", async () => {
    const codeService = new CodeService(codeRepositoryStub, codeFabric);
    const formattedId = codeRepositoryStub.id.toString();

    await codeService.getActiveCode(formattedId);
    expect(codeRepositoryStub.store[formattedId].user_id).toEqual(formattedId);
  });

  it("returns the old code", async () => {
    const codeService = new CodeService(codeRepositoryStub, codeFabric);
    const formattedId = codeRepositoryStub.id.toString();

    (differenceInMinutes as any).mockReturnValueOnce(1);

    const oldCode = await codeService.getActiveCode(formattedId);
    const newCode = await codeService.getActiveCode(formattedId);

    expect(oldCode?.code).toBeDefined();
    expect(newCode?.code).toBeDefined();
    expect(oldCode?.code).toEqual(newCode?.code);
  });

  it("returns a new code and deletes the old one ", async () => {
    const codeService = new CodeService(codeRepositoryStub, codeFabric);
    const formattedId = codeRepositoryStub.id.toString();

    const oldCode = await codeService.getActiveCode(formattedId);

    (differenceInMinutes as any).mockReturnValueOnce(11);

    const newCode = await codeService.getActiveCode(formattedId);

    expect(oldCode?.code).toBeDefined();
    expect(newCode?.code).toBeDefined();
    expect(oldCode?.code).not.toEqual(newCode?.code);

    const renewedCode = codeRepositoryStub.store[oldCode?.userId as string];

    expect(renewedCode?.id).toEqual(newCode?.id);
  });
});

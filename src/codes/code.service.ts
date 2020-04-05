import { differenceInMinutes } from "date-fns";

import { config } from "../config";

import { CodeRepository, MaybeCode, Code } from "./code.types";
import { CodeFabric } from "./code.entity";

export class CodeService {
  constructor(
    private repository: CodeRepository,
    private codeFabric: CodeFabric,
  ) {}

  private getNewCode = async (userId: string): MaybeCode => {
    const codeEntity = this.codeFabric.getNewCodeEntity(userId);
    const codeDto = await this.repository.addCode(codeEntity);

    if (codeDto) {
      return this.codeFabric.getCodeFromDto(codeDto);
    }

    return;
  };

  private getCodeByUserId = async (userId: string): MaybeCode => {
    const codeDto = await this.repository.findByUserId(userId);

    if (codeDto) {
      return this.codeFabric.getCodeFromDto(codeDto);
    }

    return;
  };

  private getIsCodeExpired = (oldCode: Code): boolean => {
    const now = new Date();
    const difference = differenceInMinutes(now, new Date(oldCode.createdAt));

    return difference > config.codeExpiresIn;
  };

  private deleteCode = async (userId: string): MaybeCode => {
    const codeDto = await this.repository.deleteCodeByUserId(userId);

    if (codeDto) {
      return this.codeFabric.getCodeFromDto(codeDto);
    }

    return;
  };

  getCode = async (userId: string): MaybeCode => {
    const oldCode = await this.getCodeByUserId(userId);

    if (oldCode) {
      const isExpired = this.getIsCodeExpired(oldCode);

      if (isExpired) {
        await this.deleteCode(userId);

        return this.getNewCode(userId);
      }

      return oldCode;
    }

    return this.getNewCode(userId);
  };
}

import { getCamelCaseObject } from "../utils/get-camel-case-object";
import { generateCode } from "../utils/generate-code";

import { CodeDto } from "./code.types";

export class CodeEntity {
  code: string;
  userId: string;
  createdAt: Date;

  constructor(userId: string) {
    this.userId = userId;
    this.code = generateCode();
    this.createdAt = new Date();
  }
}

export class CodeFabric {
  getNewCodeEntity = (userId: string): CodeEntity => {
    return new CodeEntity(userId);
  };

  getCodeFromDto = (codeDto: CodeDto): CodeEntity & { id: string } => {
    return getCamelCaseObject(codeDto) as CodeEntity & { id: string };
  };
}

import Maybe from "graphql/tsutils/Maybe";

import { CodeEntity } from "./code.entity";

export interface CodeDto {
  id: string;
  code: string;
  user_id: string;
  created_at: Date;
}

export interface CodeInput {
  code: string;
  userId: string;
}

export type Code = CodeEntity & { id: string };

export type MaybeCodeDto = Promise<Maybe<CodeDto>>;
export type MaybeCode = Promise<Maybe<Code>>;

export interface CodeRepository {
  deleteCodeByUserId: (userId: string) => MaybeCodeDto;
  findByUserId: (userId: string) => MaybeCodeDto;
  addCode: (codeEntity: CodeEntity) => MaybeCodeDto;
}

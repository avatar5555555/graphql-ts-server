import { Pool } from "pg";

import { CodeRepository, CodeDto, MaybeCodeDto } from "./code.types";
import { CodeEntity } from "./code.entity";

const selectCodeByUserIdQuery = "SELECT * FROM codes WHERE codes.user_id = $1";

const addCodeQuery =
  "INSERT INTO CODES(code, user_id, created_at) VALUES($1, $2, $3) RETURNING *";

const deleteCodeQuery =
  "DELETE FROM codes WHERE codes.user_id = $1  RETURNING *";

export class Repository implements CodeRepository {
  constructor(private store: Pool) {}

  addCode = async (codeInput: CodeEntity): MaybeCodeDto => {
    const response = await this.store.query<CodeDto>(addCodeQuery, [
      codeInput.code,
      codeInput.userId,
      codeInput.createdAt,
    ]);

    const [code] = response.rows;

    return code;
  };

  deleteCodeByUserId = async (userId: string): MaybeCodeDto => {
    const response = await this.store.query<CodeDto>(deleteCodeQuery, [userId]);

    const [code] = response.rows;

    return code;
  };

  findByUserId = async (userId: string): MaybeCodeDto => {
    const response = await this.store.query<CodeDto>(selectCodeByUserIdQuery, [
      userId,
    ]);

    const [code] = response.rows;

    return code;
  };
}

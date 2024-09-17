import {
  createRecord,
  getRecordById,
  updateRecords,
} from "@/app/api/crudService";

import { NextRequest, NextResponse } from "next/server";

import { User } from "@/models/user";
import { Session } from "@/models/session";

const TABLE_NAME = "Session";

export async function POST(request: NextRequest) {
  try {
    const user: User = await request.json();
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }
    const session = await getSession(user);
    if (!session) {
      // ランダムなトークンを生成
      const token = Math.random().toString(36);
      // トークンの有効期限を設定
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const result = await createRecord<Session>(TABLE_NAME, {
        userId: user.id,
        token,
        expiresAt: expires.toUTCString(),
      });
      if (result === "error") throw new Error("セッションの作成に失敗しました");
      return NextResponse.json(result);
    } else {
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const result = await updateRecords<Session>(
        TABLE_NAME,
        { userId: user.id },
        {
          expiresAt: expires.toUTCString(),
        }
      );
      if (result === null) throw new Error("セッションの更新に失敗しました");
      return NextResponse.json(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

async function getSession(user: User) {
  // user_idからセッションを取得
  return await getRecordById<Session>(TABLE_NAME, { userId: user.id });
}

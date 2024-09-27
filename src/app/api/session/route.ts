import {
  createRecord,
  getRecordById,
  updateRecords,
  deleteRecords,
} from "@/app/api/crudService";

import { NextRequest, NextResponse } from "next/server";

import { Session } from "@/models/session";

import { cookies } from "next/headers";

const TABLE_NAME = "Session";

export async function POST(request: NextRequest) {
  try {
    const userId: number = await request.json();
    if (!userId) {
      throw new Error("ユーザーが見つかりません");
    }
    const session = await getSession(userId);
    if (!session) {
      // ランダムなトークンを生成
      const token = Math.random().toString(36);
      // トークンの有効期限を設定
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const result = await createRecord<Session>(TABLE_NAME, {
        userId,
        token,
        expiresAt: expires.toUTCString(),
      });
      if (result === "error") throw new Error("セッションの作成に失敗しました");
      return NextResponse.json(result);
    } else {
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const result = await updateRecords<Session>(
        TABLE_NAME,
        { userId },
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

export async function DELETE() {
  try {
    const userCookie = cookies().get("user");
    // Cookieがない場合はエラーを返す
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login"));
    }
    console.log(userCookie.value);
    // セッションを削除する
    await deleteRecords<Session>(TABLE_NAME, {
      userId: JSON.parse(userCookie.value).userId,
    });
    cookies().delete("user");
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

async function getSession(userId: number) {
  // user_idからセッションを取得
  return await getRecordById<Session>(TABLE_NAME, { userId });
}

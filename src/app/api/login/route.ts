import { createRecord, getRecordById } from "@/app/api/crudService";
import bcrypt from "bcrypt";

import { NameInputs, LoginFormInputs, User } from "@/models/user";

import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

const TABLE_NAME = "User";
export async function GET(request: NextRequest) {
  try {
    // クエリストリングからemailを取得
    const { searchParams } = new URL(request.url);
    const email = decodeURIComponent(searchParams.get("email") as string);
    const password = decodeURIComponent(searchParams.get("password") as string);
    // emailとpasswordがない場合はエラーを返す
    if (!email || !password) {
      const error = new Error("emailとpasswordを入力してください");
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }
    // emailからユーザーを取得
    const user = await getRecordById<User>(TABLE_NAME, { email });
    // ユーザーが存在しない場合はエラーを返す
    if (!user) {
      const error = new Error("ユーザーが見つかりません");
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    // ハッシュ化したパスワードとユーザーのパスワードを比較
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      // パスワードが一致しない場合はエラーを返す
      const error = new Error("パスワードが一致しません");
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    } else {
      setSession(user);
      return NextResponse.json(user);
    }
  } catch (e: unknown) {
    const error = e as Error & { statusCode?: number };
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user: NameInputs & LoginFormInputs = await request.json();
    // パスワードのハッシュ化
    user.password = await bcrypt.hash(user.password, 10);
    const result = await createRecord<NameInputs & LoginFormInputs>(
      TABLE_NAME,
      user
    );
    if (result === "error") throw new Error("ログインに失敗しました");
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("ユーザー作成に失敗しました");
    }
    const createdUser = result[0] as User;
    // セッションにユーザー情報を保存
    setSession(createdUser);
    return NextResponse.json(createdUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

/**
 * セッションを作成
 * @param {User} user
 * @returns {Tables<Session>} result
 */
async function setSession(user: User) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_CLIENT_URL + "/api/session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const response = await result.json();
  // セッションデータのうちtokenをセッションストレージに保存
  const { token, expiresAt } = await response[0];
  if (!token) {
    throw new Error("セッションの作成に失敗しました");
  }
  const cookieStore = cookies();
  // クッキーにtokenを保存
  cookieStore.set("token", token, {
    expires: new Date(expiresAt),
  });
}

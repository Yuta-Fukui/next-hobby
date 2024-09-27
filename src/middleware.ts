import { NextResponse, type NextRequest } from "next/server";

import { Session } from "@/models/session";

export async function middleware(request: NextRequest) {
  // cookieからユーザーセッションデータを取得
  const session = request.cookies.get("user");
  // cookieがない場合はエラーを返す
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // データが改竄されていないかどうかを確認
  const sessionData = JSON.parse(session.value) as Session;
  // 有効期限が切れている場合はエラーを返す
  if (new Date() > new Date(sessionData.expiresAt)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/dashboard",
};

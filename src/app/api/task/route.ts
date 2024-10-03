import {
  getRecords,
  createRecord,
  updateRecords,
  deleteRecords,
} from "@/app/api/crudService";

import type { Task, TaskTable } from "@/models/task";

import { type NextRequest, NextResponse } from "next/server";

import { Session } from "@/models/session";

const TABLE_NAME = "Task";

export async function GET(request: NextRequest) {
  try {
    // cookieからユーザーセッションデータを取得
    const session = request.cookies.get("user");
    if (!session) {
      throw new Error("ログインしてください");
    }
    const sessionData = JSON.parse(session.value) as Session;
    const tasks = await getRecords<TaskTable>(TABLE_NAME, {
      userId: Number(sessionData.userId),
    });
    return NextResponse.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // cookieからユーザーセッションデータを取得
    const session = request.cookies.get("user");
    if (!session) {
      throw new Error("ログインしてください");
    }
    const sessionData = JSON.parse(session.value) as Session;
    const task: Task = await request.json();
    const registerData = {
      ...task,
      userId: Number(sessionData.userId),
    } as Task & { userId: number };
    const result = await createRecord<Task>(TABLE_NAME, registerData);
    if (result === "error") throw new Error("タスクの追加に失敗しました");
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("タスクの追加に失敗しました");
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: NextRequest) {
  try {
    // cookieからユーザーセッションデータを取得
    const session = request.cookies.get("user");
    if (!session) {
      throw new Error("ログインしてください");
    }
    const sessionData = JSON.parse(session.value) as Session;
    const task: TaskTable = await request.json();
    const result = await updateRecords<TaskTable>(
      TABLE_NAME,
      { id: task.id },
      { ...task, userId: Number(sessionData.userId) }
    );
    if (result === null) throw new Error("タスクの更新に失敗しました");
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("タスクの更新に失敗しました");
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = request.cookies.get("user");
    if (!session) {
      throw new Error("ログインしてください");
    }
    const id = await request.json();
    await deleteRecords<TaskTable>(TABLE_NAME, id);
    return NextResponse.json({ message: "削除しました" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

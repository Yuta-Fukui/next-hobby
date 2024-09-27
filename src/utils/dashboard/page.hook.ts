import { mutate } from "swr";
import type { Task, TaskTable } from "@/models/task";
import useSWR from "swr";

// タスクステータスに応じた色のマッピング
export const statusColors: { [key in Task["status"]]: string } = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export const getStatusLabel = (status: Task["status"]) => {
  switch (status) {
    case "pending":
      return "保留中";
    case "in_progress":
      return "進行中";
    case "completed":
      return "完了";
    default:
      return "";
  }
};

export const updateTasks = () => {
  mutate("/api/task", undefined, true); // キャッシュをクリアして再フェッチ;
};

export async function fetcher() {
  const response = await fetch("/api/task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  } else {
    return (await response.json()) as TaskTable[];
  }
}

const getFetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export function useDashboardHooks() {
  const { data, error, isLoading, mutate } = useSWR("/api/task", getFetcher, {
    dedupingInterval: 0, // 再フェッチを常に行う
    revalidateOnFocus: true, // ウィンドウがフォーカスされたときに再検証
    revalidateOnReconnect: true, // ネットワーク再接続時に再検証
  });
  return { data, error, isLoading, mutate };
}

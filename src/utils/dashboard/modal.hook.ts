import { type Task } from "@/models/task";

type UpdateTask = { id: number } & Task;

export async function fetcher(task: Task | UpdateTask, method: "PUT" | "POST") {
  const response = await fetch("/api/task", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  } else {
    return true;
  }
}

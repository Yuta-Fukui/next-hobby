"use client";
import { useState } from "react";
import type { TaskTable } from "@/models/task";
import TaskFilter from "@/components/dashboard/TaskFilter";
import CardSection from "@/components/dashboard/CardSection";
import NoTask from "@/components/dashboard/NoTask";
import Loading from "@/components/dashboard/Loading";
import { useDashboardHooks } from "@/utils/dashboard/page.hook";

export default function Main() {
  const [filter, setFilter] = useState<"all" | TaskTable["status"]>("all");
  const { data, error, isLoading } = useDashboardHooks();
  if (error) return <div>Load is Faild</div>;
  if (isLoading || typeof data === "string") return <Loading />;

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* フィルターセクションとタスク追加ボタン */}
      <TaskFilter filter={filter} setFilter={setFilter} />
      {/* タスク一覧 */}
      {!data || data.length === 0 ? (
        <NoTask />
      ) : (
        <CardSection filter={filter} tasks={data} />
      )}
    </main>
  );
}

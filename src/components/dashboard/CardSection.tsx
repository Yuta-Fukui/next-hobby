import { useMemo } from "react";
import type { TaskTable } from "@/models/task";
import TaskCard from "@/components/dashboard/TaskCard";
import NoTask from "@/components/dashboard/NoTask";

type Props = {
  filter: "all" | "pending" | "in_progress" | "completed";
  tasks: TaskTable[];
};

export default function CardSection({ tasks, filter }: Props) {
  const filteredTasks = useMemo(() => {
    return filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);
  }, [tasks, filter]); // 依存配列を追加
  if (!filteredTasks || filteredTasks.length === 0) {
    return <NoTask />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

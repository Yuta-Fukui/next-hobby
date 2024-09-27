import { Card } from "@/components/ui/card";
import UpdateModal from "@/components/dashboard/UpdateModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import type { TaskTable } from "@/models/task";
import clcx from "clsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getStatusLabel, useDashboardHooks } from "@/utils/dashboard/page.hook";

type Props = {
  task: TaskTable;
};

const statusColors: { [key in TaskTable["status"]]: string } = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function TaskCard({ task }: Props) {
  const queryClient = new QueryClient();
  const { mutate } = useDashboardHooks();
  return (
    <Card className="shadow-md bg-white rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <span
          className={clcx(
            "px-2 py-1 text-sm font-medium rounded",
            statusColors[task.status]
          )}
        >
          {getStatusLabel(task.status)}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">期限: {task.dueDate}</span>
        <div className="flex space-x-2">
          <QueryClientProvider client={queryClient}>
            <UpdateModal
              {...task}
              updateTasks={async () => {
                await mutate("api/task", true);
              }}
            />
            <DeleteModal
              {...task}
              updateTasks={async () => {
                await mutate("api/task", true);
              }}
            />
          </QueryClientProvider>
        </div>
      </div>
    </Card>
  );
}

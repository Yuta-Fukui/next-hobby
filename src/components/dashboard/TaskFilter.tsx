import { useDashboardHooks } from "@/utils/dashboard/page.hook";
import { Button } from "@/components/ui/button";
import CreateModal from "@/components/dashboard/CreateModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  filter: "all" | "pending" | "in_progress" | "completed";
  setFilter: (filter: "all" | "pending" | "in_progress" | "completed") => void;
};

export default function TaskFilter({ filter, setFilter }: Props) {
  const queryClient = new QueryClient();
  const { mutate } = useDashboardHooks();
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-wrap items-center mb-4 md:mb-0">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          className="mr-2 mb-2 md:mb-0"
          onClick={() => setFilter("all")}
        >
          全て
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          className="mr-2 mb-2 md:mb-0"
          onClick={() => setFilter("pending")}
        >
          保留中
        </Button>
        <Button
          variant={filter === "in_progress" ? "default" : "outline"}
          className="mr-2 mb-2 md:mb-0"
          onClick={() => setFilter("in_progress")}
        >
          進行中
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          完了
        </Button>
      </div>
      {/* タスク追加ボタン */}
      <QueryClientProvider client={queryClient}>
        <CreateModal
          updateTasks={async () => {
            await mutate("api/task", true);
          }}
        />
      </QueryClientProvider>
    </div>
  );
}

import { type TaskTable } from "@/models/task";

import { useMutation } from "@tanstack/react-query";

import { revalidatePath } from "next/cache";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

function useDeleteTask() {
  return useMutation({
    mutationFn: async (id: number) => {
      const success = await fetch("/api/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (success) {
        revalidatePath("/dashboard");
      }
    },
  });
}

export default function DeleteModal({
  title,
  id,
  updateTasks,
}: TaskTable & { updateTasks: () => void }) {
  const { mutate, isPending } = useDeleteTask();
  const handleDeleteTask = async () => {
    await mutate(id);
    updateTasks();
    document.getElementById("dialog-close-button")?.click(); // モーダルを閉じる
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="h-5 w-5 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>タスク削除</DialogTitle>
          <DialogDescription>
            {`「${title}」を削除します。よろしいですか？`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost" id="dialog-close-button">
              キャンセル
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={handleDeleteTask}>
            {isPending ? "削除中..." : "削除"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

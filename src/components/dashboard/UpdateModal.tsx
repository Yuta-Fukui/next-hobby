"use client";
import { type Task, taskSchema, type TaskTable } from "@/models/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetcher } from "@/utils/dashboard/modal.hook";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input as TextInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

function useUpdateTask() {
  return useMutation({
    mutationFn: async (task: Task) => {
      const success = await fetcher(task, "PUT");
      if (success) {
        revalidatePath("/dashboard");
      }
    },
  });
}

export default function UpdateModal({
  id,
  title,
  status,
  dueDate,
  description,
  createdAt,
  updatedAt,
  updateTasks,
}: TaskTable & { updateTasks: () => void }) {
  const form = useForm<TaskTable>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title,
      status,
      dueDate: format(dueDate, "yyyy-MM-dd", {
        locale: ja,
      }),
      description,
    },
  });
  const { mutate, isPending } = useUpdateTask();

  const onSubmit = async (task: Task) => {
    const updateTask = { ...task, id, createdAt, updatedAt };
    await mutate(updateTask);
    form.reset(); // フォームのリセット
    updateTasks();
    document.getElementById("dialog-close-button")?.click(); // モーダルを閉じる
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil1Icon className="h-5 w-5 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>タスク追加</DialogTitle>
          <DialogDescription>
            新しいタスクの詳細を入力してください。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={() => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      id="title"
                      type="text"
                      placeholder="タイトル"
                      {...form.register("title")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="説明"
                      rows={4}
                      {...form.register("description")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={status}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          id="status"
                          placeholder="ステータス"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">保留中</SelectItem>
                        <SelectItem value="in_progress">進行中</SelectItem>
                        <SelectItem value="completed">完了</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={() => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      id="dueDate"
                      type="date"
                      placeholder="期限"
                      defaultValue={dueDate}
                      {...form.register("dueDate")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost" id="dialog-close-button">
                  キャンセル
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                {isPending ? "登録中..." : "追加"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

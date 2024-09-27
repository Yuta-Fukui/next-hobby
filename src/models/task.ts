import { z } from "zod";
import { dateSchema } from "./date";

import { parseISO, isAfter } from "date-fns";

export const taskSchema = z.object({
  title: z.string().min(1, "タイトルは入力必須です"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"], {
    required_error: "ステータスは入力必須です",
  }),
  dueDate: z.string().refine(
    (date) => {
      const parsedDate = parseISO(date);
      return isAfter(parsedDate, new Date());
    },
    {
      message: "当日以降の日付を入力してください",
    }
  ),
});

export type Task = z.infer<typeof taskSchema>;

const taskTable = z
  .object({ id: z.number(), userId: z.number() })
  .merge(taskSchema)
  .merge(dateSchema);

export type TaskTable = z.infer<typeof taskTable>;

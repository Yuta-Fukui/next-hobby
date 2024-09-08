import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

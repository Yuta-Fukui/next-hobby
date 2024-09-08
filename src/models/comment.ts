import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  authorId: z.number(),
  content: z.string().min(1, "Content is required"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;

import { z } from "zod";

export const postCategorySchema = z.object({
  postId: z.number(),
  categoryId: z.number(),
});

export type PostCategory = z.infer<typeof postCategorySchema>;

import { z } from "zod";

export const dateSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});

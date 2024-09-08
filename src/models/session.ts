import { z } from 'zod';

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.number(),
  expiresAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;

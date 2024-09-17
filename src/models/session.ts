import { z } from 'zod';

export const sessionSchema = z.object({
  userId: z.number(),
  token: z.string(),
  expiresAt: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;

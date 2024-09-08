import { z } from "zod";

// ユーザー全体のスキーマ
export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string(),
  role: z.enum(["admin", "user"]),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ログインフォーム用スキーマ
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

// TypeScriptの型をZodのスキーマから生成
export type User = z.infer<typeof userSchema>;
export type LoginFormInputs = z.infer<typeof loginFormSchema>;

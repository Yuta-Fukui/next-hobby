import { z } from "zod";

// ユーザー全体のスキーマ
export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(1, "ユーザー名は入力必須です"),
  email: z.string().email("メールアドレスは入力必須です"),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ユーザー登録フォーム用スキーマ
export const nameSchema = z.object({
  username: z.string().min(1, "ユーザー名は入力必須です"),
});

// ログインフォーム用スキーマ
export const loginFormSchema = z.object({
  email: z.string().email("メールアドレスは入力必須です"),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください" }),
});

// TypeScriptの型をZodのスキーマから生成
export type User = z.infer<typeof userSchema>;
export type NameInputs = z.infer<typeof nameSchema>;
export type LoginFormInputs = z.infer<typeof loginFormSchema>;

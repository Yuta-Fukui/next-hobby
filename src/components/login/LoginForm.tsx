"use client";

import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormInputs } from "@/models/user";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input as TextInput } from "@/components/ui/input";

async function fetcher(user: LoginFormInputs) {
  const response = await fetch(
    `/api/login?email=${encodeURIComponent(
      user.email
    )}&password=${encodeURIComponent(user.password)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  } else {
    return true;
  }
}

function useLoginUser() {
  const router = useRouter(); // useRouterをここで呼び出す
  return useMutation({
    mutationFn: async (user: LoginFormInputs) => {
      const success = await fetcher(user);
      if (success) {
        router.push("/dashboard");
      }
    },
  });
}

function LoginForm() {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate, isPending } = useLoginUser();

  const onSubmit = async (user: LoginFormInputs) => {
    // ここでサーバーにデータを送信する処理を実装
    await mutate(user);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem className="mb-4 w-full max-w-xs">
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="メールアドレス"
                  {...form.register("email", {
                    required: "メールアドレスは入力必須です",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <FormItem className="mb-6 w-full max-w-xs">
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <TextInput
                  placeholder="パスワード"
                  id="password"
                  type="password"
                  {...form.register("password", {
                    required: "パスワードは入力必須です",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isPending ? "..." : "ログイン"}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;

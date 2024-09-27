"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  nameSchema,
  loginFormSchema,
  NameInputs,
  LoginFormInputs,
} from "@/models/user";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input as TextInput } from "@/components/ui/input";

import { useRouter } from "next/navigation";

type RegistrationFormInputs = NameInputs & LoginFormInputs;

async function fetcher(user: RegistrationFormInputs) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  } else {
    return true;
  }
}

function useCreateUser() {
  const router = useRouter(); // useRouterをここで呼び出す
  return useMutation({
    mutationFn: async (user: RegistrationFormInputs) => {
      const success = await fetcher(user);
      if (success) {
        router.push("/dashboard");
      }
    },
  });
}

function RegistrationForm() {
  const form = useForm<RegistrationFormInputs>({
    resolver: zodResolver(nameSchema.merge(loginFormSchema)),
  });

  const { mutate, isPending } = useCreateUser();

  const onSubmit = (user: RegistrationFormInputs) => {
    // ここでサーバーにデータを送信する処理を実装
    mutate(user);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <FormItem className="mb-4 w-full max-w-xs">
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <TextInput
                  id="username"
                  type="text"
                  placeholder="ユーザー名"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  {...form.register("username")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  {...form.register("email")}
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
                  id="password"
                  type="password"
                  placeholder="パスワード"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  {...form.register("password")}
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
          {isPending ? "登録中..." : "登録"}
        </Button>
      </form>
    </Form>
  );
}

export default RegistrationForm;

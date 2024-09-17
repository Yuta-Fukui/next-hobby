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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(nameSchema.merge(loginFormSchema)),
  });

  const { mutate, isPending } = useCreateUser();

  const onSubmit = (user: RegistrationFormInputs) => {
    // ここでサーバーにデータを送信する処理を実装
    mutate(user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center p-5"
    >
      <div className="mb-4 w-full max-w-xs">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username:
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.username && (
          <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-4 w-full max-w-xs">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-6 w-full max-w-xs">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full max-w-xs bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isPending ? "登録中..." : "登録"}
      </button>
    </form>
  );
}

export default RegistrationForm;

"use client";

import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormInputs } from "@/models/user";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate } = useLoginUser();

  const onSubmit = async (user: LoginFormInputs) => {
    // ここでサーバーにデータを送信する処理を実装
    await mutate(user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center p-5"
    >
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
          {...register("email", { required: "Email is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          {...register("password", { required: "Password is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full max-w-xs bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;

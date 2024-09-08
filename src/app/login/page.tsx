import React from "react";
import LoginForm from "@/components/LoginForm";

// 関数コンポーネントを定義
function LoginPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="m-auto w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-5">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;

import LoginForm from "@/components/login/LoginForm";
import Link from "next/link";

// 関数コンポーネントを定義
function LoginPage() {
  return (
    <>
      <LoginForm />
      <Link href="/login/create">新規登録はこちら</Link>
    </>
  );
}

export default LoginPage;

import Main from "@/components/dashboard/Main";
import Header from "@/components/dashboard/Header";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <Header />
      {/* メインコンテンツ */}
      <Main />
    </div>
  );
}

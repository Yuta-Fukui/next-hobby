"use client"
import { Button } from "@/components/ui/button";

import logout from "@/utils/dashboard/header.hooks";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          タスクダッシュボード
        </h1>
        <div className="flex items-center space-x-4">
          {/* ログアウトボタン */}
          <Button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => logout()}
          >
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  );
}

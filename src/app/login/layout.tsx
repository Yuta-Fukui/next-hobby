"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <section className="flex h-screen bg-gray-50">
      <div className="m-auto w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-5">Sign Up</h1>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
    </section>
  );
}

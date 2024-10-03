import { useRouter } from "next/navigation";

export default function HeaderHooks() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/session", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/login");
  };
  return { logout };
}

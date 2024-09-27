import { User } from "@/models/user";

import { cookies } from "next/headers";

const cookieStore = cookies();

export function setCookie(user: User) {
  cookies().set("user", JSON.stringify(user.id));
}

export function getSession() {
  const user = cookieStore.get("user");
  return user ? JSON.parse(user.value) : -1;
}

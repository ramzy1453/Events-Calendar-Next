import UserApi from "@/lib/api/user";
import { cookies } from "next/headers";
import { RequireAuth } from "./RequireAuth.client";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = await cookies();
  const token = nextCookies.get("token")?.value;

  try {
    const user = await UserApi.verify(token);

    return <RequireAuth user={user.data}>{children}</RequireAuth>;
  } catch {
    return <>{children}</>;
  }
}

import UserApi from "@/lib/api/user";
import { RequireAuth } from "./RequireAuth.client";
import { cookies } from "next/headers";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const nextCookies = await cookies();
    const token = nextCookies.get("token")?.value;
    const user = await UserApi.verify(token);

    return <RequireAuth user={user.data}>{children}</RequireAuth>;
  } catch {
    return <>{children}</>;
  }
}

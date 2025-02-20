import UserApi from "@/lib/api/user";
import { RequireAuth } from "./RequireAuth.client";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const user = await UserApi.verify();

    return <RequireAuth user={user.data}>{children}</RequireAuth>;
  } catch {
    return <>{children}</>;
  }
}

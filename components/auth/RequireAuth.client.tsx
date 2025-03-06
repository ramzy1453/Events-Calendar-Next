"use client";

import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { IUser } from "@/types/user";
import { useSocket } from "@/hooks/useSocket";

export function RequireAuth({
  user,
  token,
  children,
}: {
  user: IUser | null;
  token?: string;
  children: React.ReactNode;
}) {
  const setUser = useUser((state) => state.setUser);
  const connectSocket = useSocket((state) => state.connectSocket);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    if (token) {
      connectSocket(token);
    }
  }, [user, setUser, token, connectSocket]);

  return <>{children}</>;
}

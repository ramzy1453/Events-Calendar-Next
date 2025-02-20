"use client";

import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { IUser } from "@/types/user";

export function RequireAuth({
  user,
  children,
}: {
  user: IUser | null;
  children: React.ReactNode;
}) {
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return <>{children}</>;
}

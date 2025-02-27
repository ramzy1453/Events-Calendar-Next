"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import { useLogoutMutation } from "@/lib/services/user.service";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export default function Navbar() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "New Job Match",
      description: "A new job matching your profile has been posted",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Application Update",
      description: "Your application has been reviewed",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Profile View",
      description: "A company viewed your profile",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((notifications) =>
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((notifications) =>
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  const user = useUser((state) => state.user);
  const clearUser = useUser((state) => state.clearUser);

  const { mutateAsync: logout } = useLogoutMutation();
  const router = useRouter();
  async function signOut() {
    router.push("/auth/login");

    logout();

    clearUser();
  }

  console.log({ user });
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8 py-8 flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">HisEvento</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-8 w-8" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[380px]">
                <div className="flex items-center justify-between p-4">
                  <div className="text-sm font-medium">Notifications</div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      className="text-xs text-muted-foreground"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <Separator />
                <ScrollArea className="h-[400px]">
                  {notifications.length > 0 ? (
                    <div className="grid gap-1">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          className={cn(
                            "flex w-full items-start gap-4 p-4 text-left",
                            !notification.read && "bg-muted/50"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="font-medium">
                                {notification.title}
                              </div>
                              {!notification.read && (
                                <span className="flex h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {notification.description}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {notification.time}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No new notifications
                    </div>
                  )}
                </ScrollArea>
                <Separator />
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-center">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Image
                  width={32}
                  height={32}
                  src={
                    "https://img9.irna.ir/d/r2/2024/08/26/4/171360290.jpg?ts=1724685216150"
                  }
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                />
              </HoverCardTrigger>
              <HoverCardContent align="end" className="w-64">
                <div className="flex items-center gap-4">
                  <Image
                    width={32}
                    height={32}
                    src={
                      "https://img9.irna.ir/d/r2/2024/08/26/4/171360290.jpg?ts=1724685216150"
                    }
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{user?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <nav>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        <User className="h-4 w-4" />
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
                <Separator className="my-4" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  size="sm"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";

import "./globals.css";
import ReactQueryProvider from "@/lib/providers/react-query";
import { Toaster } from "sonner";
import AuthProvider from "@/components/auth/AuthProvider.server";
import NotificationListener from "@/components/NotificationsListner";

export const metadata: Metadata = {
  title: "Events Calendar",
  description: "Events Calendar project done by Ramzy Kemmoun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <NotificationListener />
          <ReactQueryProvider>
            <AuthProvider>
              <main className="dark">{children}</main>
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

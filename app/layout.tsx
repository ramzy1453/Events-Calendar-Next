import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";

import "./globals.css";
import ReactQueryProvider from "@/lib/providers/react-query";
import { Toaster } from "sonner";
import AuthProvider from "@/components/auth/AuthProvider.server";

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
          <ReactQueryProvider>
            <AuthProvider>
              <main className="container mx-auto px-8 py-8 dark">
                {children}
              </main>
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

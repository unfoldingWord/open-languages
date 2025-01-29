"use client";
import dynamic from "next/dynamic";
import "./globals.css";
import { usePathname } from "next/navigation";

import { Toaster } from "@components/ShadcnUi/toaster";
import AppContextProvider from "@context/AppContext";
import { AuthProvider } from "@context/AuthProvider";
import QueryContextProvider from "@context/QueryContext";
import { cn } from "@lib/utils";

const metadata = {
  title: "Open Languages",
  description: "Generated by create next app",
};

const NavBar = dynamic(() => import("@components/NavBar"), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const resourcePath = path.includes("resource");
  const exportPath = path.includes("export");

  return (
    <html lang="en">
      <head></head>
      <body>
        <div>
          <Toaster />
          <AuthProvider>
            <AppContextProvider>
              <QueryContextProvider>
                <NavBar
                  backgroundColor={cn(
                    resourcePath ? "bg-gray-500" : "bg-primary"
                  )}
                />
                <div
                  className={cn(
                    "relative h-screen overflow-hidden bg-white pt-24",
                    resourcePath && "h-screen overflow-auto",
                    exportPath && "h-screen overflow-auto"
                  )}
                >
                  {children}
                </div>
              </QueryContextProvider>
            </AppContextProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}

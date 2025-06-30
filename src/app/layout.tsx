import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "SafeSpotSearch",
  description: "내 주변 안전한 장소 찾기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex flex-row w-screen h-screen`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

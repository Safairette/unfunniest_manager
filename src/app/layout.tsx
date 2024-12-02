import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TopNav } from "./_components/comps";

export const metadata: Metadata = {
  title: "Unfunniest",
  description: "world's least competent password manager",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white min-h-svh">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
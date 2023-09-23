import "./globals.css";
import type { Metadata } from "next";
import { B612 } from "next/font/google";

import Header from "@/components/header";
import Providers from "./providers";

const b612 = B612({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Samurai Sign",
  description: "web3 trustless secure signing app, made for ETHNewYork",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={b612.className}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

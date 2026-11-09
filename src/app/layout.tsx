import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Fazrin Syafiq | Wedding Invitation",
  description: "Undangan pernikahan Fazrin Syafiq, 20 Desember 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

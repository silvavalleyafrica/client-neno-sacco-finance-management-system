import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neno SACCO | Finance, made clearer",
  description:
    "A connected financial management workspace for Neno SACCO members and teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

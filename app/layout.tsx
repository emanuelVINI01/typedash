import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeDash – Teste de Velocidade de Digitação",
  description: "Painel de velocidade e precisão de digitação estilo MonkeyType construído com Next.js e tema Dracula.",
};

import { AuthProvider } from "@/src/components/auth/session-provider";
import Footer from "@/src/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <title>TypeDash</title>
        <link rel="icon" type="image/x-icon" href="/logo.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>

    </html>
  );
}

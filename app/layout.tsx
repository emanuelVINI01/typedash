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
  title: 'TypeDash | Desafio de Digitação para Devs',
  description: 'Messa sua velocidade de codificação e precisão em tempo real. O dashboard definitivo para desenvolvedores que buscam performance.',
  keywords: ['typing test', 'velocidade de digitação', 'wpm', 'programador', 'dracula theme', 'typedash'],
  authors: [{ name: 'Emanuel' }],
  openGraph: {
    title: 'TypeDash - Performance em cada tecla',
    description: 'Será que você digita tão rápido quanto coda? Teste seu WPM agora.',
    url: 'https://typedash-beta.vercel.app', // Substitua pela sua URL real
    siteName: 'TypeDash',
    images: [
      {
        url: '/dash_image.png', // Uma screenshot do seu dashboard ficaria animal aqui
        width: 1080,
        height: 630,
        alt: 'Preview do TypeDash Dashboard',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeDash | Coding Speed Test',
    description: 'Teste sua velocidade de digitação com o tema Dracula.',
    images: ['/dash_image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

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

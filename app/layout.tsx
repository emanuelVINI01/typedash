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
  metadataBase: new URL("https://typedash-beta.vercel.app"),
  title: {
    default: "TypeDash",
    template: "%s | TypeDash",
  },
  description: "Meça sua velocidade e precisão de digitação em tempo real com histórico pessoal e rankings por período.",
  keywords: ["typing test", "velocidade de digitação", "wpm", "programador", "dracula theme", "typedash"],
  authors: [{ name: "Emanuel" }],
  applicationName: "TypeDash",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "TypeDash - Performance em cada tecla",
    description: "Teste seu WPM, acompanhe sua evolução e dispute rankings diários, semanais, mensais e gerais.",
    url: "https://typedash-beta.vercel.app",
    siteName: "TypeDash",
    images: [
      {
        url: "/dash_image.png",
        width: 1080,
        height: 630,
        alt: "Preview do TypeDash Dashboard",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeDash | Coding Speed Test",
    description: "Teste sua velocidade de digitação com o tema Dracula.",
    images: ["/dash_image.png"],
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
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>

    </html>
  );
}

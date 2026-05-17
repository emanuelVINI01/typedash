import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://typedash-beta.vercel.app"),
  title: {
    default: "TypeDash",
    template: "%s | TypeDash",
  },
  description: "Measure typing speed and accuracy in real time with personal history, rankings and a mobile-first Dracula interface.",
  keywords: ["typing test", "velocidade de digitação", "wpm", "programador", "dracula theme", "typedash"],
  authors: [{ name: "Emanuel" }],
  applicationName: "TypeDash",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "TypeDash - Performance em cada tecla",
    description: "Test WPM, track progress and compete in daily, weekly, monthly and all-time rankings.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeDash | Coding Speed Test",
    description: "Typing speed test with persistent metrics and a Dracula theme.",
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
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>

    </html>
  );
}

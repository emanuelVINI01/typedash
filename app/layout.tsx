import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/src/components/Providers";
import Footer from "@/src/components/layout/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://typedash-beta.vercel.app"),
  title: {
    default: "TypeDash",
    template: "%s | TypeDash",
  },
  description: "Practice typing with clear feedback, saved progress and a global ranking.",
  keywords: ["typing test", "typing practice", "wpm", "accuracy", "productivity", "typedash"],
  authors: [{ name: "Emanuel" }],
  applicationName: "TypeDash",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "TypeDash - Typing practice that stays clear",
    description: "Practice, follow your progress and compare your best results over time.",
    url: "https://typedash-beta.vercel.app",
    siteName: "TypeDash",
    images: [
      {
        url: "/dash_image.png",
        width: 1080,
        height: 630,
        alt: "TypeDash preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeDash | Typing practice",
    description: "Practice typing with saved progress and a global ranking.",
    images: ["/dash_image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-medium">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>

    </html>
  );
}

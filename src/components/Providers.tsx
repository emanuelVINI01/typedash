"use client";

import { AuthProvider } from "@/src/components/auth/session-provider";
import { LanguageProvider } from "@/src/context/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
}

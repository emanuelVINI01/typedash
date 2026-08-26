"use client";

import { Keyboard } from "lucide-react";
import { signIn } from "next-auth/react";
import { Header } from "@/src/components/main/Header";
import { useLanguage } from "@/src/context/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground lg:pb-0">
      <Header />

      {/* Login Box */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-current-line/70 bg-current-line/35 p-6 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-8">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple/30 bg-purple/10">
          <Keyboard className="h-6 w-6 text-purple" />
        </span>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">{t.loginPage.title}</h1>
        <p className="mb-8 text-center text-sm text-[var(--fg-subtle)]">
          {t.loginPage.subtitle}
        </p>

        <div className="w-full flex flex-col gap-4">
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--fg)] transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--card-hover)] active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
            </svg>
            {t.loginPage.continueWithGithub}
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}

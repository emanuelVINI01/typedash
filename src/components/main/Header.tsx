"use client";

import { useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Home,
  Info,
  Keyboard,
  LayoutDashboard,
  LogIn,
  LogOut,
  Trophy,
} from "lucide-react";
import { LanguageSwitcher } from "@/src/components/shared/LanguageSwitcher";
import { useLanguage } from "@/src/context/LanguageContext";

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = useMemo(
    () => [
      { href: "/", label: t.common.test, icon: Home },
      { href: "/practice", label: t.common.practice, icon: Dumbbell },
      { href: "/ranking", label: t.common.ranking, icon: Trophy },
      { href: "/dashboard", label: t.common.dashboard, icon: LayoutDashboard },
      { href: "/about", label: t.common.about, icon: Info },
    ],
    [t],
  );

  return (
    <>
      <motion.header
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="sticky top-0 z-40 border-b border-current-line/60 bg-background/88 px-4 py-3 backdrop-blur-xl md:px-8"
      >
        <div className="mx-auto flex h-11 w-full max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-2.5">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-purple/40 bg-purple/10 shadow-[0_0_20px_rgba(255,121,198,0.18)] transition-colors group-hover:border-purple/70">
              <Image
                src="/logo.png"
                alt={t.header.logoAlt}
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="min-w-0 truncate text-sm font-semibold tracking-tight text-foreground">
              TypeDash
              <span className="hidden text-comment sm:inline"> / {t.header.brandSuffix}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-xs font-semibold uppercase tracking-widest transition-colors hover:text-purple ${isActive ? "text-purple" : "text-comment"
                    }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="typedash-desktop-nav-active"
                      className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 rounded-full bg-purple shadow-[0_0_10px_rgba(255,121,198,0.75)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {session ? (
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="hidden max-w-[190px] flex-col items-end md:flex">
                <span className="text-[10px] uppercase tracking-widest text-comment">{t.common.loggedIn}</span>
                <span className="truncate text-sm font-medium text-foreground">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={t.header.userAvatarAlt}
                  width={32}
                  height={32}
                  unoptimized
                  className="rounded-full border border-purple/50"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-purple/40 bg-purple/10 text-xs font-bold text-purple">
                  <Keyboard className="h-4 w-4" />
                </span>
              )}
              <button
                onClick={() => signOut()}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red/20 bg-red/10 px-2.5 text-xs font-semibold uppercase tracking-widest text-red transition-colors hover:border-red/50 sm:px-3"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.common.logout}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link
                href="/login"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-purple/30 bg-purple px-3 text-xs font-semibold uppercase tracking-widest text-background shadow-lg shadow-purple/20 transition-transform hover:-translate-y-0.5"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{t.common.login}</span>
              </Link>
            </div>
          )}
        </div>
      </motion.header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-current-line/80 bg-background/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] pt-2 shadow-[0_-16px_34px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-stretch gap-0.5 sm:gap-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-full min-w-0 flex-col items-center justify-between rounded-xl px-0.5 py-1.5 text-[9px] font-semibold uppercase tracking-tight transition-colors sm:px-1 sm:text-[10px] ${isActive ? "text-foreground" : "text-comment hover:text-purple"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="typedash-mobile-nav-pill"
                    className="absolute inset-0 rounded-xl border border-purple/35 bg-current-line shadow-lg shadow-black/25"
                    transition={{ type: "spring", stiffness: 430, damping: 36 }}
                  />
                )}
                <span
                  className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-lg transition-colors sm:h-7 sm:w-7 ${isActive ? "bg-purple/15 text-purple" : "text-comment"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="relative z-10 block h-3 max-w-full truncate leading-3">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

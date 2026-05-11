"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Info, LayoutDashboard, LogIn, LogOut } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full px-4 py-5 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo TypeDash"
            width={32}
            height={32}
            className="rounded-lg shadow-lg shadow-[#bd93f9]/20"
            priority
          />
          <span className="text-xl font-bold" style={{ color: "#bd93f9" }}>
            TypeDash
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav className="flex items-center gap-1">
            <Link
              href="/sobre"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-[#44475a]/40 hover:text-white"
            >
              <Info size={15} />
              Sobre
            </Link>

            {session && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
                style={{ color: "#bd93f9" }}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
            )}
          </nav>

        {session ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-xs text-slate-400">Logado como</span>
              <span className="text-sm font-medium text-white">{session.user?.name || session.user?.email}</span>
            </div>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Usuário"
                width={32}
                height={32}
                unoptimized
                className="rounded-full border border-purple-500"
              />
            )}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
            >
              <LogOut size={15} />
              Sair
            </button>
          </div>
        ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: "#bd93f9", color: "#282a36" }}
            >
              <LogIn size={15} />
              Entrar
            </Link>
        )}
        </div>
      </div>
    </header>
  );
}

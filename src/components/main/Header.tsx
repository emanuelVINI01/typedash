"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Keyboard } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full flex items-center justify-between px-8 py-5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Keyboard className="w-6 h-6" style={{ color: "#bd93f9" }} />
        <a
          className="text-xl font-bold tracking-tight"
          style={{ color: "#bd93f9" }}
          href="/"
        >
          TypeDash
        </a>
      </div>

      <div className="flex items-center gap-3">
        {session ? (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400">Logado como</span>
              <span className="text-sm font-medium text-white">{session.user?.name || session.user?.email}</span>
            </div>
            {session.user?.image && (
              <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full border border-purple-500" />
            )}
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border"
              style={{ borderColor: "#bd93f9", color: "#bd93f9" }}
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 rounded-lg text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.05] active:scale-[0.95]"
              style={{ background: "#bd93f9", color: "#282a36" }}
            >
              Entrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

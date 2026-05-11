import Link from "next/link";
import { ExternalLink, Keyboard } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import packageJson from "@/package.json";

export default function Footer() {
    return (
        <footer className="w-full mt-24 border-t border-[#44475a] bg-[#21222c]/50 py-10 text-[#6272a4]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">

                <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="flex items-center gap-2 text-[#f8f8f2] font-semibold text-xl">
                        <Keyboard className="w-6 h-6 text-[#bd93f9]" />
                        <span>TypeDash</span>
                    </div>
                    <p className="text-sm text-[#6272a4] text-center md:text-left max-w-sm leading-relaxed">
                        Teste de digitação com histórico pessoal, rankings por período e métricas transparentes para acompanhar evolução.
                    </p>
                </div>

                <nav className="flex flex-col items-center gap-3 text-sm md:items-end">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                        <Link
                            href="/sobre"
                            className="rounded-lg px-3 py-2 text-[#f8f8f2] transition-colors hover:bg-[#44475a]/40 hover:text-[#bd93f9]"
                        >
                            Sobre
                        </Link>
                        <Link
                            href="/dashboard"
                            className="rounded-lg px-3 py-2 text-[#f8f8f2] transition-colors hover:bg-[#44475a]/40 hover:text-[#bd93f9]"
                        >
                            Dashboard
                        </Link>
                    </div>

                    <a
                        href="https://github.com/emanuelVINI01/typedash"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-[#bd93f9]/20 bg-[#bd93f9]/10 px-4 py-2 text-[#f8f8f2] transition-colors hover:border-[#bd93f9]/50 hover:text-[#bd93f9]"
                    >
                        <FaGithub className="w-4 h-4" />
                        <span className="font-medium">emanuelVINI01/typedash</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </nav>
            </div>

            <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-center justify-between gap-3 border-t border-[#44475a]/50 px-6 pt-6 text-xs text-[#6272a4] sm:flex-row">
                <p>&copy; {new Date().getFullYear()} TypeDash. Projeto open-source.</p>
                <span className="opacity-70">v{packageJson.version}</span>
            </div>
        </footer>
    );
}

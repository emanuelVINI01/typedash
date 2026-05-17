import Link from "next/link";
import { ExternalLink, Keyboard, ShieldCheck, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import packageJson from "@/package.json";

const footerLinks = [
  { label: "Test", href: "/" },
  { label: "Practice", href: "/practice" },
  { label: "Ranking", href: "/ranking" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-current-line/70 bg-background text-comment">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-32 pt-10 sm:gap-10 sm:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-start">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3 text-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple/40 bg-purple/10 shadow-[0_0_22px_rgba(189,147,249,0.18)]">
                <Keyboard className="h-5 w-5 text-purple" />
              </span>
              <span className="font-semibold tracking-tight">TypeDash</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Mobile-first typing performance lab with WPM telemetry, personal history, rankings, practice resources and a Dracula developer interface.
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-cyan" />
              Navigation
            </div>
            <div className="grid gap-2 text-sm">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-cyan">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-green" />
              Project
            </div>
            <div className="grid gap-3 text-sm">
              <a
                href="https://github.com/emanuelVINI01/typedash"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan/20 bg-cyan/10 px-3 py-2 text-foreground transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <FaGithub className="h-4 w-4" />
                Repository
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span>Version {packageJson.version}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-current-line/50 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TypeDash. Open-source typing analytics project.</p>
          <p className="text-comment/80">Next.js + Auth.js + Recharts + Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}

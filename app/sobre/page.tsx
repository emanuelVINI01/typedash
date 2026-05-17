import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  Keyboard,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Header } from "@/src/components/main/Header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about TypeDash, an open-source typing performance app with WPM, accuracy, history and rankings.",
};

const pillars = [
  {
    title: "Objective measurement",
    description:
      "WPM and accuracy are calculated from real keystroke logs, including Backspace corrections.",
    icon: Keyboard,
  },
  {
    title: "Personal progress",
    description:
      "Authenticated users keep test history and charts for long-term consistency tracking.",
    icon: BarChart3,
  },
  {
    title: "Fair competition",
    description:
      "Daily, weekly, monthly and all-time rankings show each user's best score in the period.",
    icon: Trophy,
  },
];

const stack = [
  "Next.js App Router",
  "Auth.js with GitHub",
  "PostgreSQL and Prisma",
  "Tailwind CSS",
  "Framer Motion",
  "Recharts",
  "Zod",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24 text-foreground lg:pb-0">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-6 sm:px-6 sm:py-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-comment">
                About the project
              </p>
              <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
                TypeDash
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-comment">
                TypeDash is a typing performance platform for measuring speed,
                precision and progress with a direct Dracula interface, persistent
                history and public rankings.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-4 py-3 text-sm font-semibold text-background shadow-lg shadow-purple/20 transition-transform hover:-translate-y-0.5"
              >
                Start a test
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/emanuelVINI01/typedash"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-current-line px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-purple hover:text-purple"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-current-line bg-current-line/10 shadow-2xl shadow-black/20">
            <Image
              src="/dash_image.png"
              alt="TypeDash dashboard screen"
              width={1080}
              height={630}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="rounded-2xl border border-current-line bg-current-line/20 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10 text-purple">
                  <Icon size={20} />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-comment">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-comment">
              Engineering
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">
              Built to practice, measure and review progress
            </h2>
            <p className="mt-4 text-sm leading-6 text-comment">
              The project combines typing UX, authentication, database persistence
              and metric visualization into a small, useful typing analytics product.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-current-line bg-current-line/10 p-5">
              <ShieldCheck className="h-6 w-6 text-green" />
              <h3 className="mt-4 font-semibold text-foreground">
                User data
              </h3>
              <p className="mt-2 text-sm leading-6 text-comment">
                Results are saved only for authenticated users, using GitHub as
                the identity source for ranking ownership.
              </p>
            </div>
            <div className="rounded-2xl border border-current-line bg-current-line/10 p-5">
              <Database className="h-6 w-6 text-cyan" />
              <h3 className="mt-4 font-semibold text-foreground">
                Technical base
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-current-line px-2.5 py-1 text-xs text-comment"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

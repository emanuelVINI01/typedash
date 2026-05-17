import type { Metadata } from "next";
import { AboutPageContent } from "@/src/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "See how TypeDash helps you practice, follow your progress and compare your best results.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}

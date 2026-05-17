"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface FaqItemProps {
  answer: string;
  question: string;
}

function FaqItem({ answer, question }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-current-line/45 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-foreground transition-colors hover:text-cyan"
      >
        <span className="flex items-center gap-2.5 text-sm sm:text-base">
          <HelpCircle className="h-4.5 w-4.5 shrink-0 text-purple" />
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-comment"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-7 text-xs leading-6 text-comment sm:text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HomeFaqSection() {
  const { t } = useLanguage();

  return (
    <section className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t.home.faqTitle}
        </h3>
        <p className="text-xs text-comment sm:text-sm">
          {t.home.faqSubtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-current-line/60 bg-current-line/10 px-5 py-2 backdrop-blur-sm">
        {t.home.faqs.map((faq) => (
          <FaqItem key={faq.question} answer={faq.answer} question={faq.question} />
        ))}
      </div>
    </section>
  );
}

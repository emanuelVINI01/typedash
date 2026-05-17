"use client";

import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";

export function MeasureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
      className="w-full rounded-2xl border border-current-line/70 bg-current-line/20 p-5"
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple/25 bg-purple/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-purple sm:text-xs">
        <Keyboard className="h-3.5 w-3.5" />
        Dracula typing cockpit
      </div>
      <h1 className="max-w-4xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-3xl xl:text-4xl">
        Measure speed, accuracy and consistency in one mobile-first flow.
      </h1>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-comment sm:text-base lg:text-sm">
        TypeDash turns keystrokes into product metrics: WPM, accuracy, correction behavior, personal history and global rankings.
      </p>
    </motion.div>
  );
}

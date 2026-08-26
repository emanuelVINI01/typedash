"use client";

import { motion } from "framer-motion";
import { Code, Eye, Smartphone, Target, TrendingUp, Trophy } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

const featureStyles = [
  "text-purple border-purple/20 bg-purple/10",
  "text-cyan border-cyan/20 bg-cyan/10",
  "text-orange border-orange/20 bg-orange/10",
  "text-green border-green/20 bg-green/10",
  "text-purple border-purple/20 bg-purple/10",
  "text-orange border-orange/20 bg-orange/10",
] as const;

const featureIcons = [Target, Eye, Trophy, TrendingUp, Smartphone, Code] as const;

export function HomeFeatureGrid() {
  const { t } = useLanguage();

  return (
    <section className="mt-4 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t.home.featuresTitle}
        </h3>
        <p className="text-xs text-comment sm:text-sm">
          {t.home.featuresSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.home.features.map((feature, index) => {
          const Icon = featureIcons[index];

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-xl border border-current-line/50 bg-current-line/15 p-5 transition-colors hover:border-purple/40"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${featureStyles[index]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="text-base font-semibold text-foreground">{feature.title}</h4>
              <p className="text-xs leading-5 text-comment sm:text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "../shared/AnimatedSection";

export default function BigStats() {
  const t = useTranslations("bigstats");

  const stats = [
    { value: "$2M+", label: t("paid") },
    { value: "12,000+", label: t("traders") },
    { value: "24h", label: t("processing") },
    { value: "30+", label: t("instruments") },
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

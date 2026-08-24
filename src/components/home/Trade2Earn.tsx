"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "../shared/AnimatedSection";
import { TrendingUp, Coins, ShoppingBag } from "lucide-react";

export default function Trade2Earn() {
  const t = useTranslations("t2e");

  const steps = [
    {
      icon: TrendingUp,
      title: t("trade.title"),
      body: t("trade.body"),
    },
    {
      icon: Coins,
      title: t("earn.title"),
      body: t("earn.body"),
    },
    {
      icon: ShoppingBag,
      title: t("spend.title"),
      body: t("spend.body"),
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-accent mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("sub")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-accent/20 transition-smooth group">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-smooth">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

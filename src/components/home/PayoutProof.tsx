"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "../shared/AnimatedSection";
import { Clock, Bitcoin, Building2 } from "lucide-react";

export default function PayoutProof() {
  const t = useTranslations("payoutssec");

  const stats = [
    { value: "24h", label: t("stat1") },
    { value: "90%", label: t("stat2") },
    { value: "24/7", label: t("stat3") },
    { value: "$2M+", label: t("stat4") },
  ];

  const methods = [
    {
      icon: Clock,
      title: t("process.title"),
      body: t("process.body"),
    },
    {
      icon: Bitcoin,
      title: t("crypto.title"),
      body: t("crypto.body"),
    },
    {
      icon: Building2,
      title: t("bank.title"),
      body: t("bank.body"),
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Big highlight */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gradient-card border border-border rounded-xl p-8 md:p-12 text-center mb-12">
            <h3 className="font-display font-black text-3xl md:text-4xl text-gradient mb-3">
              {t("bigTitle")}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("bigBody")}
            </p>
          </div>
        </AnimatedSection>

        {/* Stats row */}
        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-5 text-center"
              >
                <div className="font-display font-black text-2xl md:text-3xl text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Method cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method, i) => (
            <AnimatedSection key={i} delay={0.2 + i * 0.05}>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/20 transition-smooth group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-smooth">
                  <method.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {method.body}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "../shared/AnimatedSection";
import { Check, Zap, Shield, Rocket } from "lucide-react";

export default function AccountModels() {
  const t = useTranslations("models");
  const m = useTranslations("model");

  const models = [
    {
      icon: Shield,
      name: "Standard",
      features: [m("b.twoStep"), m("b.split90"), m("b.upTo150k"), m("b.scaleUp")],
      price: "$287",
      slug: "standard",
      accent: false,
    },
    {
      icon: Zap,
      name: "Instant Activation",
      features: [m("b.lowEntry"), m("b.activation"), m("b.split90")],
      price: "$97",
      slug: "instant",
      accent: true,
    },
    {
      icon: Rocket,
      name: "Instant Funded",
      features: [m("b.fastTrack"), m("b.noEval"), m("b.tradeNow")],
      price: "$299",
      slug: "instantFunded",
      accent: false,
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

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {models.map((model, i) => (
            <AnimatedSection key={model.slug + i} delay={i * 0.1}>
              <div
                className={`rounded-xl border p-8 h-full flex flex-col ${
                  model.accent
                    ? "border-accent/30 bg-gradient-card shadow-card relative"
                    : "border-border bg-card"
                }`}
              >
                {model.accent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-accent text-accent-foreground">
                    Recommended
                  </span>
                )}

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    model.accent ? "bg-accent/20" : "bg-muted"
                  }`}
                >
                  <model.icon
                    className={`w-7 h-7 ${
                      model.accent ? "text-accent" : "text-muted-foreground"
                    }`}
                  />
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  {model.name}
                </h3>

                <ul className="space-y-3 mb-6 flex-1">
                  {model.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">From </span>
                  <span className="font-display font-black text-2xl text-foreground">
                    {model.price}
                  </span>
                </div>

                <Link
                  href={`/challenges/${model.slug}`}
                  className={`w-full inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-base transition-smooth ${
                    model.accent
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent-glow"
                      : "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {t("cta")}
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

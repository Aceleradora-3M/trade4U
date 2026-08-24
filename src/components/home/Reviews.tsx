"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "../shared/AnimatedSection";
import { Star, Quote } from "lucide-react";

export default function Reviews() {
  const t = useTranslations("reviews");
  const r = useTranslations("rev");

  const reviews = ["r1", "r2", "r3", "r4", "r5"];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((key, i) => (
            <AnimatedSection key={key} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/20 transition-smooth h-full flex flex-col">
                <Quote className="w-8 h-8 text-accent/20 mb-4" />

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{r(`${key}.body`)}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {r(`${key}.name`)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {r(`${key}.title`)}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

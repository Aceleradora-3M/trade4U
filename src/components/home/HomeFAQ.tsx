"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getMarket } from "@/data/market";
import Accordion from "../shared/Accordion";

export default function HomeFAQ() {
  const section = useTranslations("section.faq");
  const faq = useTranslations("faq");

  const { homeFaqCount } = getMarket(useLocale());
  const items = Array.from({ length: homeFaqCount }, (_, i) => ({
    question: faq(`q${i + 1}`),
    answer: faq(`a${i + 1}`),
  }));

  return (
    <section className="py-24 border-t border-border/30">
      <div className="container max-w-3xl">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-glow/90 mb-4">
            FAQ
          </div>
          <h2 className="text-2xl md:text-[2.5rem] font-display font-bold tracking-tight text-gradient leading-[1.15]">
            {section("title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {section("sub")}
          </p>
        </div>

        <Accordion items={items} />

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-accent font-semibold hover:underline"
          >
            {section("viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

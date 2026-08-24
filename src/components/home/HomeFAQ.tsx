"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Accordion from "../shared/Accordion";

export default function HomeFAQ() {
  const section = useTranslations("section.faq");
  const faq = useTranslations("faq");

  const items = [
    { question: faq("q1"), answer: faq("a1") },
    { question: faq("q2"), answer: faq("a2") },
    { question: faq("q3"), answer: faq("a3") },
    { question: faq("q4"), answer: faq("a4") },
  ];

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

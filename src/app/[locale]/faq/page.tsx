import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Accordion from "@/components/shared/Accordion";
import Button from "@/components/shared/Button";
import { Headphones } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "FAQ",
    es: "Preguntas Frecuentes",
    pt: "Perguntas Frequentes",
  };
  return { title: titles[locale] || titles.en };
}

function FaqContent() {
  const section = useTranslations("section.faq");
  const faq = useTranslations("faq");
  const cta = useTranslations("cta");

  const items = [
    { question: faq("q1"), answer: faq("a1") },
    { question: faq("q2"), answer: faq("a2") },
    { question: faq("q3"), answer: faq("a3") },
    { question: faq("q4"), answer: faq("a4") },
    { question: faq("q5"), answer: faq("a5") },
    { question: faq("q6"), answer: faq("a6") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container relative text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              Trade4U Prop
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              {section("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {section("sub")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Accordion */}
      <Section>
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <Accordion items={items} />
          </div>
        </AnimatedSection>
      </Section>

      {/* Support */}
      <Section className="bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <AnimatedSection>
          <div className="bg-gradient-card border border-border rounded-3xl p-8 md:p-10 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">
              {faq("supportTitle") || "Still have questions?"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {faq("supportBody") || "Our support team is available 24/7 to help you."}
            </p>
            <Button href="/contact">
              {cta("contactUs") || "Contact Support"}
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqContent />;
}

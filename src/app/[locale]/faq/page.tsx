import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Accordion from "@/components/shared/Accordion";

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
      <section className="bg-gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
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

import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { localeAlternates } from "@/lib/site";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Risk Disclosure",
    es: "Divulgación de Riesgo",
    pt: "Divulgação de Risco",
  };
  return {
    title: titles[locale] || titles.en,
    alternates: localeAlternates(locale, "risk-disclosure"),
  };
}

const SECTION_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

function RiskDisclosureContent() {
  const t = useTranslations("risk");

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gradient mb-4">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">{t("updated")}</p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {t("intro")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-10">
          {SECTION_KEYS.map((key, i) => (
            <AnimatedSection key={key} delay={i * 0.05}>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                {t(`${key}.title`)}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`${key}.body`)}
              </p>
            </AnimatedSection>
          ))}

          <AnimatedSection delay={0.35}>
            <Link
              href="/restricted-countries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              {t("seeRestricted")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}

export default async function RiskDisclosurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RiskDisclosureContent />;
}

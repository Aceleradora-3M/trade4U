import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { localeAlternates } from "@/lib/site";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import { Ban } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Restricted Countries",
    es: "Países Restringidos",
    pt: "Países Restritos",
  };
  return {
    title: titles[locale] || titles.en,
    alternates: localeAlternates(locale, "restricted-countries"),
  };
}

function RestrictedCountriesContent() {
  const t = useTranslations("restricted");
  const countries = t.raw("list") as string[];

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
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display font-semibold text-xl text-foreground mb-5">
              {t("listTitle")}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1 mb-10">
              {countries.map((country) => (
                <li
                  key={country}
                  className="flex items-start gap-2.5 py-2 border-b border-border/40 text-sm text-foreground/90"
                >
                  <Ban className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <span>{country}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {t("note")}
            </p>
            <Button href="/contact">{t("contact")}</Button>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}

export default async function RestrictedCountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RestrictedCountriesContent />;
}

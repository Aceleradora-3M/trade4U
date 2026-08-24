import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { challenges } from "@/data/challenges";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Challenges",
    es: "Desafios",
    pt: "Desafios",
  };
  return { title: titles[locale] || titles.en };
}

function ChallengesContent() {
  const section = useTranslations("section.challenges");
  const t = useTranslations("challenge");
  const cta = useTranslations("cta");

  // Map challenge slug to translation namespace key
  const tKeyMap: Record<string, string> = {
    standard: "standard",
    instant: "instant",
    oneday: "oneday",
    instantFunded: "instantFunded",
  };

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

      {/* Challenge Cards */}
      <Section>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {challenges.map((challenge, i) => {
            const key = tKeyMap[challenge.slug] || challenge.slug;
            const fundedPhase = challenge.phases[challenge.phases.length - 1];

            return (
              <AnimatedSection key={challenge.slug} delay={i * 0.1}>
                <Link
                  href={`/challenges/${challenge.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 h-full hover:border-accent/30 transition-all hover:shadow-elevated">
                    <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">
                      {t(`${key}.name`)}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t(`${key}.tagline`)}
                    </p>

                    {/* Quick stats from funded phase */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Profit Split
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {fundedPhase.profitSplit}
                        </p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Max Drawdown
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {fundedPhase.maxDD}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                      {cta("learnMore")}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ChallengesContent />;
}

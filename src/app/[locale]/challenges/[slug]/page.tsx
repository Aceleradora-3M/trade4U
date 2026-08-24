import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { challenges, getChallengeBySlug } from "@/data/challenges";
import Section from "@/components/shared/Section";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ChallengeDetailClient from "./client";

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);
  if (!challenge) return { title: "Not Found" };
  const names: Record<string, string> = {
    standard: "Standard Challenge",
    instant: "Instant Activation",
    oneday: "One-Day Challenge",
    instantFunded: "Instant Funded",
  };
  return { title: names[slug] || slug };
}

// Map slug to translation key prefix
const tKeyMap: Record<string, string> = {
  standard: "standard",
  instant: "instant",
  oneday: "oneday",
  instantFunded: "instantFunded",
};

function ChallengeDetailContent({ slug }: { slug: string }) {
  const detail = useTranslations("detail");
  const ruleT = useTranslations("rule");
  const challengeT = useTranslations("challenge");

  const challenge = getChallengeBySlug(slug);
  if (!challenge) notFound();

  const tKey = tKeyMap[slug] || slug;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-gradient mb-3">
              {challengeT(`${tKey}.name`)}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {challengeT(`${tKey}.tagline`)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Phase Structure */}
      <Section>
        <AnimatedSection>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">
            {detail("phases.eyebrow")}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
            {detail("phases.title")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {detail("phases.sub")}
          </p>
        </AnimatedSection>

        {/* Phase cards with rules */}
        <div className="space-y-6">
          {challenge.phases.map((phase, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant={i === challenge.phases.length - 1 ? "green" : "teal"}>
                    {detail("phase")} {i + 1}
                  </Badge>
                </div>

                {/* Rules table */}
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
                  {[
                    { label: ruleT("duration"), value: phase.duration },
                    { label: ruleT("minDays"), value: phase.minDays },
                    { label: ruleT("profitTarget"), value: phase.profitTarget },
                    { label: ruleT("dailyDD"), value: phase.dailyDD },
                    { label: ruleT("maxDD"), value: phase.maxDD },
                    { label: ruleT("leverage"), value: phase.leverage },
                    { label: ruleT("split"), value: phase.profitSplit },
                    { label: ruleT("commissions"), value: phase.commissions },
                    { label: ruleT("consistency"), value: phase.consistency },
                    { label: ruleT("sltp"), value: phase.sltp },
                    { label: ruleT("news"), value: phase.news },
                  ].map((rule, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {rule.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <AnimatedSection>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
            {detail("seePricing")}
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <ChallengeDetailClient slug={slug} />
        </AnimatedSection>
      </Section>

      {/* CTA */}
      <Section>
        <AnimatedSection>
          <div className="bg-gradient-cta rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              {detail("cta.title")}
            </h2>
            <p className="text-white/80 mb-2 max-w-lg mx-auto">
              {detail("cta.sub")}
            </p>
            <p className="text-sm text-white/60 mb-6">
              {detail("cta.note")}
            </p>
            <Button href="/challenges" size="lg" variant="secondary">
              {detail("seePricing")}
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ChallengeDetailContent slug={slug} />;
}

import { setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/site";
import Hero from "@/components/home/Hero";
import ChallengeTable from "@/components/home/ChallengeTable";
import TradingConditions from "@/components/home/TradingConditions";
import PlatformShowcase from "@/components/home/PlatformShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import WhyTradersLove from "@/components/home/WhyTradersLove";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTAFinal from "@/components/home/CTAFinal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { alternates: localeAlternates(locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ChallengeTable />
      <TradingConditions />
      <PlatformShowcase />
      <HowItWorks />
      <WhyTradersLove />
      <HomeFAQ />
      <CTAFinal />
    </>
  );
}

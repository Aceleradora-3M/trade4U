import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Work_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import MetaPixel from "@/components/tracking/MetaPixel";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Trade4U | Simulated CME Futures Evaluations",
    es: "Trade4U | Evaluaciones de Trading Simulado de Futuros CME",
    pt: "Trade4U | Conta de R$ 125 mil na bolsa americana",
  };
  const descriptions: Record<string, string> = {
    en: "Simulated futures evaluations on CME instruments. Simulated accounts from $25K to $150K, up to 90% profit split. Evaluation fee applies. Trading involves substantial risk.",
    es: "Evaluaciones de trading simulado en futuros CME. Cuentas simuladas de $25K a $150K, reparto de beneficios de hasta 90%. Se aplica cuota de evaluación. Operar futuros implica un riesgo sustancial.",
    pt: "Pague R$ 389 no Pix, uma vez só, e opere uma conta simulada de R$ 125 mil na bolsa americana. Sem prova. Até 90% do resultado, com saque no Pix. Operar na bolsa envolve risco.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Trade4U",
    },
    description,
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title,
      description,
      siteName: "Trade4U",
      type: "website",
      locale,
      url: `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${workSans.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <NextIntlClientProvider messages={messages}>
          <MetaPixel />
          <Header />
          <main>{children}</main>
          <Footer />
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

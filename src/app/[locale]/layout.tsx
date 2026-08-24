import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Work_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
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
    en: "Trade4U - Your Journey to Funded Trading Starts Here",
    es: "Trade4U - Tu Camino hacia el Trading Fondeado Comienza Aquí",
    pt: "Trade4U - Sua Jornada para o Trading Financiado Começa Aqui",
  };
  const descriptions: Record<string, string> = {
    en: "Get funded up to $150,000. Trade with our capital, keep up to 90% of the profits. No risk of your own money.",
    es: "Obtén fondeo de hasta $150,000. Opera con nuestro capital, quédate con hasta el 90% de las ganancias.",
    pt: "Receba financiamento de até $150,000. Opere com nosso capital, fique com até 90% dos lucros.",
  };

  return {
    title: {
      default: titles[locale] || titles.en,
      template: "%s | Trade4U",
    },
    description: descriptions[locale] || descriptions.en,
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      siteName: "Trade4U",
      type: "website",
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

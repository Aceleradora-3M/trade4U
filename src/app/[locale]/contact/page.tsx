import { setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/site";
import ContactForm from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Contact",
    es: "Contacto",
    pt: "Contato",
  };
  return {
    title: titles[locale] || titles.en,
    alternates: localeAlternates(locale, "contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactForm />;
}

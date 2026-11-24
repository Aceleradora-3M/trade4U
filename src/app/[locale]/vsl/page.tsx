import { setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/site";
import VslClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "vsl") };
}

export default async function VslPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VslClient />;
}

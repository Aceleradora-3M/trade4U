import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { fillBrlPrice, formatBrl, getBrlPrice } from "@/lib/brlPrice";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  let messages = (await import(`../../messages/${locale}.json`)).default;

  // The /pt copy writes the price as a token; fill it with the live BRL price.
  if (locale === "pt") {
    messages = fillBrlPrice(messages, formatBrl(await getBrlPrice()));
  }

  return { locale, messages };
});

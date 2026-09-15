import { routing } from "@/i18n/routing";

/**
 * Canonical origin for the public site.
 *
 * Every ad destination URL, canonical tag and hreflang tag must use this exact
 * form (www, https, no trailing slash). The non-www host is 301-redirected here
 * in `next.config.ts`.
 */
export const SITE_URL = "https://www.trade4uprop.com";

/** hreflang value for each supported locale. */
const HREFLANG: Record<string, string> = {
  en: "en",
  es: "es",
  pt: "pt-BR",
};

/** Locale used for the `x-default` hreflang entry. */
const DEFAULT_LOCALE = routing.defaultLocale;

function buildUrl(locale: string, pathname: string) {
  const suffix = pathname && pathname !== "/" ? `/${pathname.replace(/^\/+/, "")}` : "";
  return `${SITE_URL}/${locale}${suffix}`;
}

/**
 * Self-referencing canonical plus the full hreflang set (en, es, pt-BR,
 * x-default) for one page.
 *
 * `pathname` is the locale-relative path, e.g. "" for the homepage,
 * "challenges" or "challenges/oneday".
 */
export function localeAlternates(locale: string, pathname = "") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[HREFLANG[l] ?? l] = buildUrl(l, pathname);
  }
  languages["x-default"] = buildUrl(DEFAULT_LOCALE, pathname);

  return {
    canonical: buildUrl(locale, pathname),
    languages,
  };
}

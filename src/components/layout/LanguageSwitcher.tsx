"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronUp } from "lucide-react";

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
];

const SHORT_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  const currentLocale = LOCALES.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-[60]">
      {/* Dropdown panel */}
      {open && (
        <div className="absolute bottom-full mb-2 right-0 rounded-xl border border-border bg-card/90 backdrop-blur-xl shadow-card overflow-hidden min-w-[160px]">
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium transition-smooth ${
                loc.code === locale
                  ? "bg-accent/10 text-foreground"
                  : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
              }`}
            >
              <span className="text-base leading-none">{loc.flag}</span>
              <span>{loc.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/90 backdrop-blur-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-card hover:border-accent/50 hover:shadow-glow transition-smooth"
      >
        <Globe className="h-4 w-4 text-accent-glow" />
        <span className="text-base leading-none">{currentLocale.flag}</span>
        <span>{SHORT_LABELS[locale]}</span>
        <ChevronUp
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getDirectOffer } from "@/data/market";
import { trackStartChallenge } from "@/lib/pixel";

interface CheckoutLinkProps {
  /** Where the CTA leads when the locale has several accounts to choose from. */
  fallbackHref: "/#pricing" | "/challenges";
  /** Label used together with `fallbackHref`. */
  fallbackLabel: string;
  className?: string;
  onClick?: () => void;
  /** Rendered after the label, e.g. an arrow icon. */
  children?: ReactNode;
}

/**
 * Primary CTA. Goes straight to checkout when the locale sells a single
 * account, otherwise to the page where the visitor picks one.
 */
export default function CheckoutLink({
  fallbackHref,
  fallbackLabel,
  className,
  onClick,
  children,
}: CheckoutLinkProps) {
  const locale = useLocale();
  const cta = useTranslations("cta");
  const offer = getDirectOffer(locale);

  if (!offer) {
    return (
      <Link href={fallbackHref} className={className} onClick={onClick}>
        {fallbackLabel}
        {children}
      </Link>
    );
  }

  return (
    <a
      href={offer.buyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackStartChallenge("instant", offer.size, offer.price, offer.currency);
        onClick?.();
      }}
    >
      {cta("checkout")}
      {children}
    </a>
  );
}

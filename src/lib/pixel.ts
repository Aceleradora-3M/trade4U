declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID = "488367055531398";

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
}

export function trackPageView() {
  fbq("track", "PageView");
}

export function trackStartChallenge(
  challengeType: string,
  size: string,
  price: string
) {
  fbq("track", "InitiateCheckout", {
    content_name: `${challengeType} - ${size}`,
    content_category: "Challenge",
    value: parseFloat(price.replace(/[^0-9.]/g, "")),
    currency: "USD",
  });
}

export function trackInitiateCheckout25k() {
  fbq("trackCustom", "initiate_checkout_25k", {
    content_name: "Instant Funding - $25K",
    content_category: "Challenge",
    value: 99,
    currency: "USD",
  });
}

export function trackInitiateCheckout50k() {
  fbq("trackCustom", "initiate_checkout_50k", {
    content_name: "Instant Funding - $50K",
    content_category: "Challenge",
    value: 199,
    currency: "USD",
  });
}

export function trackContact() {
  fbq("track", "Contact");
}

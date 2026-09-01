declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID = "488367055531398";

// Campaigns optimise on a dedicated custom event for these account sizes, on
// top of the standard InitiateCheckout.
const CUSTOM_EVENT_BY_SIZE: Record<string, string | undefined> = {
  "$25K": "initiate_checkout_25k",
  "$50K": "initiate_checkout_50k",
};

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
  const payload = {
    content_name: `${challengeType} - ${size}`,
    content_category: "Challenge",
    value: parseFloat(price.replace(/[^0-9.]/g, "")),
    currency: "USD",
  };

  fbq("track", "InitiateCheckout", payload);

  // Same payload on purpose: the custom event describes the very product that
  // was clicked, so both events agree on the name and the price.
  const customEvent = CUSTOM_EVENT_BY_SIZE[size];
  if (customEvent) {
    fbq("trackCustom", customEvent, payload);
  }
}

export function trackContact() {
  fbq("track", "Contact");
}

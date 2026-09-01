"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PIXEL_ID, trackPageView } from "@/lib/pixel";

// Module scope on purpose: it has to survive the remount of the locale layout
// that happens when the user switches language, otherwise that navigation
// would be treated as a first render and skipped.
let lastTrackedPath: string | null = null;

export default function MetaPixel() {
  // Full path including the locale prefix, so /en/faq -> /pt/faq counts as a
  // new page view.
  const pathname = usePathname();

  useEffect(() => {
    // The inline script below already fires the PageView for the page the user
    // landed on. Only the client-side navigations that follow need one.
    if (lastTrackedPath === null) {
      lastTrackedPath = pathname;
      return;
    }
    if (lastTrackedPath === pathname) return;

    lastTrackedPath = pathname;
    trackPageView();
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Single canonical host: everything is served from www. The canonical and
  // hreflang tags (src/lib/site.ts) and every ad destination URL must use the
  // same form.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "trade4uprop.com" }],
        destination: "https://www.trade4uprop.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

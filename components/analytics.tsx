"use client";

import Script from "next/script";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Analytics() {
  return (
    <>
      <GoogleAnalytics
        strategy="worker"
        trackPageViews
        defaultConsent="granted"
      />
      <Script
        src={process.env.NEXT_PUBLIC_UMAMI_URL}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        strategy="worker"
      />
    </>
  );
}

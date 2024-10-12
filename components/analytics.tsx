"use client"

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Analytics() {
    return (
        <GoogleAnalytics strategy="worker" trackPageViews defaultConsent="granted" debugMode />
    )
}
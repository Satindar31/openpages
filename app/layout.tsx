// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner"


import Analytics from "@/components/analytics";
import Script from "next/script";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("", fontHeading.variable, fontBody.variable)}
        >
          {children}
          <Toaster />
          <Analytics />

  <Script id="hs-script-loader" strategy="afterInteractive" defer src={`//js-na1.hs-scripts.com/${process.env.HUBSPOT_NUMBER}.js`}/>
        </body>
      </html>
    </ClerkProvider>
  );
}

import Navbar from "@/components/navbar";
import SwarmOverlay from "@/components/swarm/swarm-overlay";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ScrollToTop />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {/* Full-Page Ambient Background with Flickering Grid & Monochrome Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {/* Subtle top spotlight gradient */}
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,0,0,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.07),transparent_70%)]"
                aria-hidden="true"
              />
              {/* Subtle center ambient radial highlight */}
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_65%)]"
                aria-hidden="true"
              />
              {/* Subtle bottom edge vignette */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03] dark:to-black/40"
                aria-hidden="true"
              />
              {/* Animated Flickering Grid with progressive organic fade */}
              <FlickeringGrid
                className="h-full w-full"
                squareSize={3}
                gridGap={3}
                flickerChance={0.2}
                maxOpacity={0.16}
                style={{
                  maskImage:
                    "radial-gradient(ellipse 95% 85% at 50% 25%, black 40%, rgba(0,0,0,0.4) 75%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 95% 85% at 50% 25%, black 40%, rgba(0,0,0,0.4) 75%, transparent 100%)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto py-14 sm:py-24 pb-36 sm:pb-44 px-4 sm:px-8 md:px-12">
              {children}
            </div>
            {/* Native App-Style Progressive Blur Edges */}
            <ProgressiveBlur
              position="bottom"
              height="110px"
              className="fixed bottom-0 inset-x-0 z-20 pointer-events-none"
            />
            <ProgressiveBlur
              position="top"
              height="40px"
              className="fixed top-0 inset-x-0 z-20 pointer-events-none"
            />
            <SwarmOverlay />
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

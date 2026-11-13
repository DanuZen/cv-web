import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { TypingAnimation } from "@/components/ui/typing-animation";
import BlurFade from "@/components/magicui/blur-fade";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <BlurFade waitForSwarm={true} action="opening contact section">
      <div
        data-swarm-hover-card="true"
        className="border border-border/70 rounded-2xl p-4 sm:p-14 relative bg-card/20 shadow-sm"
      >
        <div className="absolute -top-4 border border-neutral-800/80 dark:border-white/70 bg-linear-to-b from-neutral-800 via-neutral-900 to-black dark:from-white dark:via-neutral-100 dark:to-neutral-200 z-10 rounded-full px-5 py-1.5 left-1/2 -translate-x-1/2 shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[0_0_12px_rgba(255,255,255,0.12)]">
          <span className="text-white dark:text-neutral-950 text-xs sm:text-sm font-semibold tracking-wide">Contact</span>
        </div>
        <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-2xl overflow-hidden pointer-events-none">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>
        <div className="relative flex flex-col items-center gap-5 sm:gap-6 text-center mt-2">
          <h2 className="text-2xl sm:text-5xl font-bold tracking-tighter min-h-[36px] sm:min-h-[48px]">
            <TypingAnimation
              typeSpeed={40}
              delay={60}
              action="writing contact"
              className="text-2xl sm:text-5xl font-bold tracking-tighter"
            >
              Get in Touch
            </TypingAnimation>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-balance text-sm sm:text-lg leading-relaxed px-1 sm:px-0">
            Interested in collaborating or discussing a new project? Feel free to reach out directly via GitHub, Instagram, or email below.
          </p>

          {/* Social Contact Action Buttons */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 pt-2 w-full max-w-md mx-auto">
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl border border-neutral-800 dark:border-white/80 bg-black dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-100 text-xs sm:text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs dark:shadow-[0_0_12px_rgba(255,255,255,0.12)] group flex-1 sm:flex-initial whitespace-nowrap min-w-0"
            >
              <Icons.github className="size-3.5 sm:size-4 shrink-0 text-white dark:text-neutral-950 transition-colors" />
              <span>GitHub</span>
              <ArrowUpRight className="size-3 sm:size-3.5 text-neutral-400 group-hover:text-white dark:text-neutral-500 dark:group-hover:text-neutral-950 transition-colors shrink-0" />
            </Link>

            <Link
              href={DATA.contact.social.Instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl border border-neutral-800 dark:border-white/80 bg-black dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-100 text-xs sm:text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs dark:shadow-[0_0_12px_rgba(255,255,255,0.12)] group flex-1 sm:flex-initial whitespace-nowrap min-w-0"
            >
              <Icons.instagram className="size-3.5 sm:size-4 shrink-0 text-white dark:text-neutral-950 transition-colors" />
              <span>Instagram</span>
              <ArrowUpRight className="size-3 sm:size-3.5 text-neutral-400 group-hover:text-white dark:text-neutral-500 dark:group-hover:text-neutral-950 transition-colors shrink-0" />
            </Link>

            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl border border-neutral-800 dark:border-white/80 bg-black dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-100 text-xs sm:text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs dark:shadow-[0_0_12px_rgba(255,255,255,0.12)] group flex-1 sm:flex-initial whitespace-nowrap min-w-0"
            >
              <Icons.email className="size-3.5 sm:size-4 shrink-0 text-white dark:text-neutral-950 transition-colors" />
              <span>Email</span>
              <ArrowUpRight className="size-3 sm:size-3.5 text-neutral-400 group-hover:text-white dark:text-neutral-500 dark:group-hover:text-neutral-950 transition-colors shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}


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
        className="border border-border/70 rounded-2xl p-5 sm:p-14 relative bg-card/20 shadow-sm"
      >
        <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-5 py-1.5 left-1/2 -translate-x-1/2 shadow-sm">
          <span className="text-background text-xs sm:text-sm font-medium tracking-wide">Contact</span>
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
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border border-neutral-800 bg-black text-white hover:bg-neutral-900 text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs group"
            >
              <Icons.github className="size-4 shrink-0 text-white" />
              <span>GitHub</span>
              <ArrowUpRight className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href={DATA.contact.social.Instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border border-neutral-800 bg-black text-white hover:bg-neutral-900 text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs group"
            >
              <Icons.instagram className="size-4 shrink-0 text-white" />
              <span>Instagram</span>
              <ArrowUpRight className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border border-neutral-800 bg-black text-white hover:bg-neutral-900 text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xs group"
            >
              <Icons.email className="size-4 shrink-0 text-white" />
              <span>Email</span>
              <ArrowUpRight className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}


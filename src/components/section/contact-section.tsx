import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { TypingAnimation } from "@/components/ui/typing-animation";
import BlurFade from "@/components/magicui/blur-fade";

export default function ContactSection() {
  return (
    <BlurFade waitForSwarm={true} action="opening contact section">
      <div
        data-swarm-hover-card="true"
        className="border border-border/70 rounded-2xl p-8 sm:p-14 relative bg-card/20 shadow-sm"
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
        <div className="relative flex flex-col items-center gap-5 text-center mt-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl min-h-[48px]">
            <TypingAnimation
              typeSpeed={18}
              delay={20}
              action="writing contact"
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
            >
              Get in Touch
            </TypingAnimation>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-balance text-base sm:text-lg leading-relaxed">
            Interested in collaborating or discussing a new project? Feel free to reach out via{" "}
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm font-medium"
            >
              email
            </Link>{" "}
            or drop me a direct message on{" "}
            <Link
              href={DATA.contact.social.Instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm font-medium"
            >
              Instagram (@ryan.septiawan__)
            </Link>.
          </p>
        </div>
      </div>
    </BlurFade>
  );
}


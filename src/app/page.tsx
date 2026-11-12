/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import CertificationsSection from "@/components/section/certifications-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { SkillsSection } from "@/components/skills-section";
import { SectionHeader } from "@/components/section-header";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowUpRight, GraduationCap } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-24 sm:gap-28 md:gap-36 relative">
      <section id="hero" className="scroll-mt-24">
        <div className="w-full space-y-8">
          <div className="gap-6 flex flex-col md:flex-row justify-between items-center md:items-center">
            <div className="gap-3 flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1 flex-1">
              <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl min-h-[44px] text-center md:text-left">
                <TypingAnimation
                  typeSpeed={25}
                  delay={30}
                  action="writing headline"
                  className="font-semibold tracking-tighter text-center md:text-left"
                >
                  {`Hi, I'm ${DATA.name.split(" ")[0]}`}
                </TypingAnimation>
              </h1>
              <p className="text-muted-foreground max-w-3xl md:text-lg lg:text-xl leading-relaxed min-h-[56px] text-center md:text-left">
                <TypingAnimation
                  typeSpeed={12}
                  delay={60}
                  action="reviewing bio"
                  className="text-muted-foreground leading-relaxed inline-block w-full text-center md:text-left"
                >
                  {DATA.description}
                </TypingAnimation>
              </p>
            </div>
            <BlurFade
              delay={BLUR_FADE_DELAY}
              waitForSwarm={true}
              action="inspecting avatar"
              className="order-1 md:order-2 flex justify-center md:block"
            >
              <Avatar className="size-28 md:size-36 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 pt-4 border-t border-border/40">
            <MagicCard gradientSize={180} className="rounded-xl">
              <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 items-center text-center sm:items-start sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-0.5">
                  <NumberTicker value={12} className="text-foreground" />
                  <span className="text-primary font-bold">+</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Enterprise Apps</span>
              </div>
            </MagicCard>
            <MagicCard gradientSize={180} className="rounded-xl">
              <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 items-center text-center sm:items-start sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-0.5">
                  <NumberTicker value={DATA.skills.length} className="text-foreground" />
                  <span className="text-primary font-bold">+</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Tech Stacks</span>
              </div>
            </MagicCard>
            <MagicCard gradientSize={180} className="rounded-xl">
              <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 items-center text-center sm:items-start sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-0.5">
                  <NumberTicker value={DATA.certifications.length} className="text-foreground" />
                  <span className="text-primary font-bold">+</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Certifications</span>
              </div>
            </MagicCard>
            <MagicCard gradientSize={180} className="rounded-xl">
              <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 items-center text-center sm:items-start sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-0.5">
                  <NumberTicker value={100} className="text-foreground" />
                  <span className="text-primary font-bold">%</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Production Delivery</span>
              </div>
            </MagicCard>
          </div>
        </div>
      </section>
      <section id="about" className="scroll-mt-24">
        <div className="flex min-h-0 flex-col gap-y-8 sm:gap-y-10">
          <SectionHeader
            badge="About Me"
            title="Summary & Overview"
            description="A brief overview of my engineering background, technical expertise, and experience building scalable web solutions."
          />
          <BlurFade
            delay={BLUR_FADE_DELAY * 2}
            waitForSwarm={true}
            action="reading summary"
          >
            <div className="prose max-w-4xl mx-auto font-sans leading-relaxed text-muted-foreground dark:prose-invert text-base sm:text-lg text-justify">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work" className="scroll-mt-24">
        <div className="flex min-h-0 flex-col gap-y-8 sm:gap-y-10">
          <SectionHeader
            badge="Work Experience"
            title="Where I've Built & Shipped"
            description="Hands-on production engineering, full-stack web development, and digital public service platforms."
          />
          <WorkSection />
        </div>
      </section>
      <section id="education" className="scroll-mt-24">
        <div className="flex min-h-0 flex-col gap-y-8 sm:gap-y-10">
          <SectionHeader
            badge="Education"
            title="Academic Background"
            description="Formal university education in informatics engineering and computer science."
          />
          <div className="flex flex-col gap-4 sm:gap-6">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={index * 0.05}
                waitForSwarm={true}
                action="checking degree"
              >
                <MagicCard gradientSize={220} className="rounded-xl transition-all duration-200">
                  <Link
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-4 justify-between group p-4 sm:p-5 w-full"
                  >
                    <div className="flex items-center gap-x-4 flex-1 min-w-0">
                      {education.logoUrl ? (
                        <div className="size-10 md:size-11 p-1.5 border border-border/80 rounded-full shadow-xs ring-2 ring-border/50 overflow-hidden flex-none bg-background flex items-center justify-center">
                          <img
                            src={education.logoUrl}
                            alt={education.school}
                            className="size-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="size-10 md:size-11 p-1.5 border border-border/80 rounded-full shadow-xs ring-2 ring-border/50 bg-background flex items-center justify-center flex-none">
                          <GraduationCap className="size-5 text-foreground/80" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2 text-base">
                          <span>{education.school}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                        </div>
                        <div className="font-sans text-xs sm:text-sm text-muted-foreground">
                          {education.degree}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm tabular-nums text-muted-foreground text-right flex-none font-medium">
                      <span>
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </Link>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills" className="scroll-mt-24">
        <div className="flex min-h-0 flex-col gap-y-8 sm:gap-y-10">
          <SectionHeader
            badge="Skills & Technologies"
            title="What I Bring to the Table"
            description="Comprehensive modern stack covering frontend, backend, databases, DevOps, and cloud infrastructure."
          />
          <SkillsSection />
        </div>
      </section>
      <section id="projects" className="scroll-mt-24">
        <ProjectsSection />
      </section>
      <section id="certifications" className="scroll-mt-24">
        <CertificationsSection />
      </section>
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>
    </main>
  );
}

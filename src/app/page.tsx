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
import { SectionHeader } from "@/components/section-header";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { ArrowUpRight, GraduationCap } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-24 sm:gap-28 md:gap-36 relative">
      <section id="hero" className="scroll-mt-24">
        <div className="w-full space-y-8">
          <div className="gap-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="gap-3 flex flex-col order-2 md:order-1 flex-1">
              <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl min-h-[44px]">
                <TypewriterText
                  text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                  speed={22}
                  delay={20}
                  action="writing headline"
                  repeatOnScroll={true}
                />
              </h1>
              <p className="text-muted-foreground max-w-3xl md:text-lg lg:text-xl leading-relaxed min-h-[56px]">
                <TypewriterText
                  text={DATA.description}
                  speed={12}
                  delay={40}
                  action="reviewing bio"
                  repeatOnScroll={true}
                />
              </p>
            </div>
            <BlurFade
              delay={BLUR_FADE_DELAY}
              waitForSwarm={true}
              action="inspecting avatar"
              className="order-1 md:order-2"
            >
              <Avatar className="size-28 md:size-36 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
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
            <div className="prose max-w-4xl mx-auto text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert text-base sm:text-lg">
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
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-4 justify-between group p-4 sm:p-5 rounded-xl border border-border/50 hover:border-border hover:bg-card/60 bg-card/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-x-4 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-10 md:size-11 p-1.5 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none bg-background"
                      />
                    ) : (
                      <div className="size-10 md:size-11 p-1.5 border rounded-full shadow ring-2 ring-border bg-muted flex items-center justify-center flex-none">
                        <GraduationCap className="size-5 text-primary" />
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
          <BlurFade
            waitForSwarm={true}
            action="tagging tech stack"
            className="w-full"
          >
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center max-w-4xl mx-auto py-2">
              {DATA.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-9 w-fit px-4 flex items-center gap-2 hover:bg-muted/50 transition-colors"
                >
                  {"icon" in skill && skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </BlurFade>
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

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
import { Icons } from "@/components/icons";
import { ArrowUpRight, GraduationCap, Globe, Mail, Phone, MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 sm:gap-16 md:gap-20 relative">
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
        <section id="hero" className="scroll-mt-24">
          <div className="w-full">
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
                className="order-1 md:order-2 flex justify-center md:block pt-8 sm:pt-10 md:pt-0"
              >
                <Avatar className="size-28 md:size-36 border rounded-full shadow-lg ring-4 ring-muted">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>
          </div>
        </section>
        {/* ================= COMPACT RESUME / CV SECTION (About, Work, Education, Skills) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column (lg:col-span-7): About Me, Work Experience & Education */}
        <div className="lg:col-span-7 flex flex-col gap-10 sm:gap-12 min-w-0">
          {/* About Me */}
          <section id="about" className="scroll-mt-24">
            <div className="flex min-h-0 flex-col gap-y-4 sm:gap-y-5">
              <SectionHeader
                badge="About Me"
                title="Summary & Overview"
                description="Engineering leadership and technical background."
                align="left"
                compact
              />
              <BlurFade
                delay={BLUR_FADE_DELAY * 2}
                waitForSwarm={true}
                action="reading summary"
              >
                <div className="prose font-sans leading-relaxed text-muted-foreground dark:prose-invert text-sm sm:text-base text-justify">
                  <Markdown>
                    {DATA.summary}
                  </Markdown>
                </div>
              </BlurFade>
            </div>
          </section>

          {/* Work Experience */}
          <section id="work" className="scroll-mt-24">
            <div className="flex min-h-0 flex-col gap-y-5 sm:gap-y-6">
              <SectionHeader
                badge="Work Experience"
                title="Where I've Built & Shipped"
                description="Hands-on production engineering, full-stack web development, and digital public service platforms."
                align="left"
                compact
              />
              <WorkSection />
            </div>
          </section>

          {/* Education */}
          <section id="education" className="scroll-mt-24">
            <div className="flex min-h-0 flex-col gap-y-5 sm:gap-y-6">
              <SectionHeader
                badge="Education"
                title="Academic Background"
                description="Formal university education in informatics engineering and computer science."
                align="left"
                compact
              />
              <div className="flex flex-col divide-y divide-border/40">
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
                      className="flex flex-col sm:flex-row sm:items-center gap-y-1.5 sm:gap-x-3.5 justify-between group py-3 sm:py-3.5 px-2 sm:px-3 hover:bg-muted/30 rounded-xl transition-all duration-200 w-full"
                    >
                      <div className="flex items-center gap-x-3 sm:gap-x-3.5 flex-1 min-w-0">
                        {education.logoUrl ? (
                          <div className="size-9 sm:size-10 p-1 border border-border/80 rounded-full shadow-xs ring-2 ring-border/50 overflow-hidden flex-none bg-background flex items-center justify-center">
                            <img
                              src={education.logoUrl}
                              alt={education.school}
                              className="size-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="size-9 sm:size-10 p-1 border border-border/80 rounded-full shadow-xs ring-2 ring-border/50 bg-background flex items-center justify-center flex-none">
                            <GraduationCap className="size-4 text-foreground/80" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <div className="font-semibold leading-snug sm:leading-none flex items-center gap-2 text-sm sm:text-base">
                            <span>{education.school}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                          </div>
                          <div className="font-sans text-xs sm:text-sm text-muted-foreground">
                            {education.degree}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm tabular-nums text-muted-foreground text-left sm:text-right pl-[46px] sm:pl-0 flex-none font-medium">
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
        </div>

        {/* Right Column (lg:col-span-5): Skills, Languages, Contact */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-7 p-5 sm:p-7 rounded-3xl bg-muted/20 dark:bg-muted/10 border border-border/50 backdrop-blur-xs min-w-0">
          {/* Skills & Technologies */}
          <section id="skills" className="scroll-mt-24">
            <div className="flex min-h-0 flex-col gap-y-4 sm:gap-y-5">
              <SectionHeader
                badge="Skills & Technologies"
                title="What I Bring to the Table"
                description="Comprehensive modern stack covering frontend, backend, databases, DevOps, and cloud."
                align="left"
                compact
              />
              <SkillsSection compact />
            </div>
          </section>

          <div className="h-px w-full bg-border/40" />

          {/* Languages */}
          <section id="languages" className="scroll-mt-24">
            <div className="flex min-h-0 flex-col gap-y-3 sm:gap-y-3.5">
              <SectionHeader
                badge="Languages"
                title="Language Proficiency"
                description="Languages for communication and technical collaboration."
                align="left"
                compact
              />
              <div className="flex flex-col gap-1 sm:gap-1.5">
                {DATA.languages.map((lang, idx) => (
                  <BlurFade
                    key={lang.name}
                    delay={BLUR_FADE_DELAY * 2 + idx * 0.04}
                    waitForSwarm={true}
                    action={`reviewing ${lang.name} proficiency`}
                  >
                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-muted/30 transition-colors text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5">
                        <Globe className="size-3.5 text-primary flex-none" />
                        <span className="font-medium text-foreground">{lang.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground font-medium">
                          {lang.level}
                        </span>
                        <span className="size-1.5 rounded-full bg-emerald-500 flex-none" />
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-border/40" />

          {/* Contact Details */}
          <section id="sidebar-contact" className="scroll-mt-24">
            <div className="flex min-h-0 flex-col gap-y-3 sm:gap-y-3.5">
              <SectionHeader
                badge="Contact"
                title="Direct Channels"
                description="Channels for direct inquiry, freelance, or tech leadership."
                align="left"
                compact
              />
              <div className="flex flex-col gap-1 sm:gap-1.5">
                {/* Email */}
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + 0.02}
                  waitForSwarm={true}
                  action="reviewing contact email"
                >
                  <Link
                    href={`mailto:${DATA.contact.email}`}
                    className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Mail className="size-3.5 text-primary flex-none" />
                      <span className="truncate">{DATA.contact.email}</span>
                    </div>
                    <ArrowUpRight className="size-3 text-muted-foreground/40 group-hover:text-foreground flex-none transition-colors ml-1" />
                  </Link>
                </BlurFade>

                {/* WhatsApp / Phone */}
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + 0.05}
                  waitForSwarm={true}
                  action="reviewing contact phone"
                >
                  <Link
                    href={`https://wa.me/${DATA.contact.tel.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Phone className="size-3.5 text-primary flex-none" />
                      <span className="truncate">{DATA.contact.tel}</span>
                    </div>
                    <ArrowUpRight className="size-3 text-muted-foreground/40 group-hover:text-foreground flex-none transition-colors ml-1" />
                  </Link>
                </BlurFade>

                {/* Location */}
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + 0.08}
                  waitForSwarm={true}
                  action="reviewing contact location"
                >
                  <Link
                    href={DATA.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <MapPin className="size-3.5 text-primary flex-none" />
                      <span className="truncate">{DATA.location}</span>
                    </div>
                    <ArrowUpRight className="size-3 text-muted-foreground/40 group-hover:text-foreground flex-none transition-colors ml-1" />
                  </Link>
                </BlurFade>

                {/* GitHub */}
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + 0.11}
                  waitForSwarm={true}
                  action="reviewing contact github"
                >
                  <Link
                    href={DATA.contact.social.GitHub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icons.github className="size-3.5 text-primary flex-none" />
                      <span className="truncate">github.com/Ryan-infitech</span>
                    </div>
                    <ArrowUpRight className="size-3 text-muted-foreground/40 group-hover:text-foreground flex-none transition-colors ml-1" />
                  </Link>
                </BlurFade>

                {/* Instagram */}
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + 0.14}
                  waitForSwarm={true}
                  action="reviewing contact instagram"
                >
                  <Link
                    href={DATA.contact.social.Instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icons.instagram className="size-3.5 text-primary flex-none" />
                      <span className="truncate">@ryan.septiawan__</span>
                    </div>
                    <ArrowUpRight className="size-3 text-muted-foreground/40 group-hover:text-foreground flex-none transition-colors ml-1" />
                  </Link>
                </BlurFade>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
      <section id="certifications" className="scroll-mt-24">
        <CertificationsSection />
      </section>
      <section id="projects" className="scroll-mt-24">
        <ProjectsSection />
      </section>
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>
    </main>
  );
}

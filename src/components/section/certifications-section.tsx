/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { Award } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import BlurFade from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

export default function CertificationsSection() {
  const certifications = DATA.certifications;

  return (
    <div className="flex min-h-0 flex-col gap-y-10 sm:gap-y-12 w-full overflow-hidden">
      <SectionHeader
        badge="Certifications"
        title="Licenses & Certifications"
        description="Professional credentials and specialized certifications that validate my technical proficiency and industry standards."
      />

      {/* Certifications Timeline */}
      <Timeline>
        {certifications.map((cert, idx) => (
          <BlurFade
            key={cert.title + cert.dates}
            delay={idx * 0.08}
            waitForSwarm={true}
            action={`verifying ${cert.title}`}
          >
            <TimelineItem className="w-full flex items-start justify-between gap-4 sm:gap-6">
              <TimelineConnectItem className="flex items-start justify-center pt-1">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                  />
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex items-center justify-center flex-none">
                    <Award className="size-5 text-primary" />
                  </div>
                )}
              </TimelineConnectItem>
              <MagicCard
                gradientSize={240}
                className="flex flex-1 flex-col justify-start min-w-0 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col gap-2.5 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-semibold text-base leading-tight">{cert.title}</h3>
                    {cert.dates && (
                      <time className="text-xs sm:text-sm font-medium tabular-nums text-muted-foreground">{cert.dates}</time>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-primary">
                    {cert.issuer} • <span className="text-muted-foreground">{cert.location}</span>
                  </p>
                  {cert.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                  {cert.links && cert.links.length > 0 && (
                    <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                      {cert.links.map((link, lIdx) => (
                        <Link
                          href={link.href}
                          key={lIdx}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                            {link.icon}
                            {link.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </MagicCard>
            </TimelineItem>
          </BlurFade>
        ))}
      </Timeline>
    </div>
  );
}

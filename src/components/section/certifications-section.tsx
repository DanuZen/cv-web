/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { Award } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

export default function CertificationsSection() {
  const certifications = DATA.certifications;

  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full overflow-hidden">
      <SectionHeader
        badge="Certifications"
        title="Licenses & Certifications"
        description="Professional credentials and specialized certifications that validate my technical proficiency and industry standards."
      />

      {/* Certifications Timeline */}
      <Timeline>
          {certifications.map((cert) => (
            <TimelineItem key={cert.title + cert.dates} className="w-full flex items-start justify-between gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
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
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {cert.dates && (
                  <time className="text-xs text-muted-foreground">{cert.dates}</time>
                )}
                {cert.title && (
                  <h3 className="font-semibold leading-none">{cert.title}</h3>
                )}
                <p className="text-sm text-muted-foreground">
                  {cert.issuer} • {cert.location}
                </p>
                {cert.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {cert.description}
                  </p>
                )}
                {cert.links && cert.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {cert.links.map((link, idx) => (
                      <Link
                        href={link.href}
                        key={idx}
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
            </TimelineItem>
          ))}
        </Timeline>
    </div>
  );
}

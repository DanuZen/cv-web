/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

function LogoImage({
  src,
  srcDark,
  alt,
}: {
  src: string;
  srcDark?: string;
  alt: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-6 sm:size-8 lg:size-10 p-0.5 sm:p-1 border border-border/80 rounded-full shadow-xs ring-1 sm:ring-2 ring-border/50 bg-background flex items-center justify-center flex-none">
        <Briefcase className="size-3 sm:size-3.5 lg:size-4 text-foreground/80" />
      </div>
    );
  }

  return (
    <div className="size-6 sm:size-8 lg:size-10 p-0.5 sm:p-1 border border-border/80 rounded-full shadow-xs ring-1 sm:ring-2 ring-border/50 overflow-hidden flex-none bg-background flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className={cn(
          "size-full object-contain",
          srcDark && "dark:hidden"
        )}
        onError={() => setImageError(true)}
      />
      {srcDark && (
        <img
          src={srcDark}
          alt={alt}
          className="size-full object-contain hidden dark:block"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full min-w-0 flex flex-col divide-y divide-border/40">
      {DATA.work.map((work, idx) => (
        <BlurFade
          key={work.company}
          delay={idx * 0.03}
          waitForSwarm={true}
          action={`reviewing ${work.company}`}
          className="w-full min-w-0"
        >
          <AccordionItem
            value={work.company}
            className="w-full min-w-0 border-none py-1.5 sm:py-2.5 lg:py-3.5 px-1 sm:px-2 lg:px-3 hover:bg-muted/30 rounded-lg sm:rounded-xl transition-all duration-200"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-2.5 lg:gap-x-3.5 justify-between w-full text-left min-w-0">
                <div className="flex items-center gap-x-1.5 sm:gap-x-2.5 lg:gap-x-3.5 flex-1 min-w-0">
                  <LogoImage
                    src={work.logoUrl}
                    srcDark={
                      "logoUrlDark" in work
                        ? (work as { logoUrlDark?: string }).logoUrlDark
                        : undefined
                    }
                    alt={work.company}
                  />
                  <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                    <div className="font-semibold leading-snug sm:leading-none flex items-center gap-1.5 text-[11px] sm:text-sm lg:text-base min-w-0 w-full">
                      <span className="truncate block flex-1 min-w-0">{work.company}</span>
                      <span className="relative inline-flex items-center w-3 h-3 sm:w-3.5 sm:h-3.5 flex-none">
                        <ChevronRight
                          className={cn(
                            "absolute h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                            "translate-x-0 opacity-0",
                            "group-hover:translate-x-1 group-hover:opacity-100",
                            "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "absolute h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                            "opacity-0 rotate-0",
                            "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                          )}
                        />
                      </span>
                    </div>
                    <div className="font-sans text-[9.5px] sm:text-xs lg:text-sm text-muted-foreground flex items-center gap-1 sm:gap-2 flex-wrap min-w-0 w-full">
                      <span className="truncate block flex-1 min-w-0">{work.title}</span>
                      {work.badges && work.badges.length > 0 && (
                        <span className="hidden sm:inline-flex items-center gap-1">
                          {work.badges.map((badge) => (
                            <span
                              key={badge}
                              className="text-[9px] sm:text-[10px] font-medium px-1 sm:px-1.5 py-0.2 rounded-full border border-border/50 bg-muted/30 text-muted-foreground"
                            >
                              {badge}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] sm:text-xs lg:text-sm tabular-nums text-muted-foreground text-left sm:text-right pl-7 sm:pl-[38px] lg:pl-0 flex-none font-medium">
                  <span>
                    {work.start} - {work.end ?? "Present"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1.5 pb-1 mt-1.5 border-t border-border/30 text-[9.5px] sm:text-xs lg:text-sm leading-relaxed text-muted-foreground text-justify pl-7 sm:pl-[38px] lg:pl-[48px]">
              {work.description}
            </AccordionContent>
          </AccordionItem>
        </BlurFade>
      ))}
    </Accordion>
  );
}


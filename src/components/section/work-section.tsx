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
      <div className="size-9 sm:size-10 p-1 border border-border/80 rounded-full shadow-xs ring-2 ring-border/50 bg-background flex items-center justify-center flex-none">
        <Briefcase className="size-4 text-foreground/80" />
      </div>
    );
  }

  return (
    <div className="size-9 sm:size-10 p-1 border border-border/80 rounded-full shadow-xs ring-2 ring-border/50 overflow-hidden flex-none bg-background flex items-center justify-center">
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
    <Accordion type="single" collapsible className="w-full flex flex-col divide-y divide-border/40">
      {DATA.work.map((work, idx) => (
        <BlurFade
          key={work.company}
          delay={idx * 0.03}
          waitForSwarm={true}
          action={`reviewing ${work.company}`}
        >
          <AccordionItem
            value={work.company}
            className="w-full border-none py-3 sm:py-3.5 px-2 sm:px-3 hover:bg-muted/30 rounded-xl transition-all duration-200"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-1.5 sm:gap-x-3.5 justify-between w-full text-left">
                <div className="flex items-center gap-x-3 sm:gap-x-3.5 flex-1 min-w-0">
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
                    <div className="font-semibold leading-snug sm:leading-none flex items-center gap-2 text-sm sm:text-base">
                      <span>{work.company}</span>
                      <span className="relative inline-flex items-center w-3.5 h-3.5 flex-none">
                        <ChevronRight
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                            "translate-x-0 opacity-0",
                            "group-hover:translate-x-1 group-hover:opacity-100",
                            "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                            "opacity-0 rotate-0",
                            "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                          )}
                        />
                      </span>
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                      <span>{work.title}</span>
                      {work.badges && work.badges.length > 0 && (
                        <span className="hidden sm:inline-flex items-center gap-1">
                          {work.badges.map((badge) => (
                            <span
                              key={badge}
                              className="text-[10px] font-medium px-1.5 py-0.2 rounded-full border border-border/50 bg-muted/30 text-muted-foreground"
                            >
                              {badge}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm tabular-nums text-muted-foreground text-left sm:text-right pl-[46px] sm:pl-0 flex-none font-medium">
                  <span>
                    {work.start} - {work.end ?? "Present"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2.5 pb-1 mt-2 border-t border-border/30 text-xs sm:text-sm leading-relaxed text-muted-foreground text-justify pl-[46px] sm:pl-[48px]">
              {work.description}
            </AccordionContent>
          </AccordionItem>
        </BlurFade>
      ))}
    </Accordion>
  );
}


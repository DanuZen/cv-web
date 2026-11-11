/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { MagicCard } from "@/components/ui/magic-card";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <MagicCard
      gradientSize={280}
      className={cn(
        "flex flex-col h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-200",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-32 bg-gradient-to-br from-card via-muted/50 to-muted/80 border-b border-border/50 flex flex-col justify-between p-4 relative overflow-hidden group-hover:from-accent/30 transition-all duration-300">
              <div className="flex items-center gap-1.5 opacity-60">
                <span className="size-2 rounded-full bg-red-500/70" />
                <span className="size-2 rounded-full bg-yellow-500/70" />
                <span className="size-2 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                <Globe className="size-3.5 text-primary shrink-0" />
                <span className="truncate max-w-[260px]">
                  <TypingAnimation
                    typeSpeed={12}
                    delay={40}
                    waitForSwarm={false}
                    cursorStyle="block"
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {href ? href.replace(/^https?:\/\//, "").replace(/\/$/, "") : title}
                  </TypingAnimation>
                </span>
              </div>
            </div>
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-3.5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-base sm:text-lg leading-snug">{title}</h3>
            <time className="text-xs text-muted-foreground tabular-nums font-medium">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-1 hover:bg-muted"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs sm:text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border/70 h-6 w-fit px-2.5 bg-muted/30"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </MagicCard>
  );
}

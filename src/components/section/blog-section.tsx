import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

export default function BlogSection() {
  const posts = allPosts;
  const sortedPosts = [...posts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section id="blog" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Blog</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Latest Articles & Insights
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Thoughts on software engineering, product architecture, and tech leadership.
            </p>
          </div>
        </div>

        {/* Blog Post List */}
        {sortedPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {sortedPosts.map((post, id) => {
              const slug = post._meta.path.replace(/\.mdx$/, "");
              return (
                <BlurFade delay={BLUR_FADE_DELAY * 14 + id * 0.04} key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-foreground/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span className="text-xs font-mono tabular-nums text-muted-foreground mt-1 flex-none">
                        {String(id + 1).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-semibold text-base sm:text-lg tracking-tight group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <ChevronRight
                            className="size-4 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 flex-none"
                            aria-hidden
                          />
                        </div>
                        {post.summary && (
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {post.summary}
                          </p>
                        )}
                      </div>
                    </div>
                    <time className="text-xs font-mono text-muted-foreground/80 sm:text-right shrink-0 pl-7 sm:pl-0">
                      {formatDate(post.publishedAt)}
                    </time>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}


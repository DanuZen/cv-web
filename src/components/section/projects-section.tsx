import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { SectionHeader } from "@/components/section-header";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
        <div className="flex min-h-0 flex-col gap-y-10 sm:gap-y-12">
            <SectionHeader
                badge="My Projects"
                title="Check out my latest work"
                description="I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full mx-auto auto-rows-fr">
                {DATA.projects.map((project, id) => (
                    <BlurFade
                        key={project.title}
                        delay={0}
                        waitForSwarm={true}
                        action={`testing ${project.title}`}
                        className="h-full"
                    >
                        <ProjectCard
                            href={project.href}
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            dates={project.dates}
                            tags={project.technologies}
                            image={project.image}
                            video={project.video}
                            links={project.links}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}


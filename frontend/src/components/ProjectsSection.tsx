import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";

export default function ProjectsSection({
  eyebrow,
  heading,
  items,
  projectLinks = false,
}: {
  eyebrow: string;
  heading: string;
  items: CaseStudy[];
  projectLinks?: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
      <div className="mb-12">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-gray-400">{eyebrow}</p>
        <h1 className="text-3xl font-medium tracking-tight text-gray-950 md:text-5xl">{heading}</h1>
      </div>
      <div className="space-y-6 pb-20">
        {items.map((study) => (
          <Link
            key={study.slug}
            href={projectLinks && (study.projectUrl || study.githubUrl) ? (study.projectUrl || study.githubUrl)! : `/case-studies/${study.slug}`}
            target={projectLinks && (study.projectUrl || study.githubUrl) ? "_blank" : undefined}
            rel={projectLinks && (study.projectUrl || study.githubUrl) ? "noopener noreferrer" : undefined}
            className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg md:grid-cols-[280px_1fr]"
          >
            <div className="relative flex min-h-48 items-center justify-center overflow-hidden bg-gray-50 p-5 md:min-h-full">
              {study.thumbnail ? (
                <Image
                  src={study.thumbnail}
                  alt={`${study.title} thumbnail`}
                  width={1126}
                  height={636}
                  className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${study.thumbnailFit === "contain" ? "object-contain p-12" : "object-cover"}`}
                />
              ) : (
                <div className="text-center">
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    {study.area}
                  </span>
                  <span className="mt-3 block text-2xl font-semibold text-gray-300">Project</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-6 p-7 md:p-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">{study.area}</span>
                <h2 className="mt-3 text-2xl font-semibold text-gray-950 md:text-3xl">{study.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">{study.summary}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-gray-900">View project ↗</span>
              </div>
              <span className="hidden text-3xl text-gray-300 transition-colors group-hover:text-gray-900 md:block">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

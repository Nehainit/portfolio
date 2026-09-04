import { readFile } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/caseStudies";
import MarkdownArticle from "@/components/MarkdownArticle";

const navItems = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Case Studies", "/case-studies"],
  ["Socials", "/socials"],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) notFound();

  const fullText = study.fullTextPath
    ? await readFile(path.join(process.cwd(), "public", study.fullTextPath), "utf8")
    : null;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="flex items-center justify-between border-b border-gray-100 px-6 py-5 md:px-10">
        <a
          href="https://github.com/Nehainit"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-3 py-1.5 text-sm text-gray-500 transition-all duration-300 hover:bg-gray-900 hover:text-white"
        >
          GitHub
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1 md:gap-2">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-2 py-1.5 text-xs transition-all duration-300 md:px-3 md:text-sm ${
                label === "Case Studies"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <article className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
        <Link href="/case-studies" className="text-sm font-semibold text-gray-500 hover:text-gray-900">
          ← All case studies
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <span className="inline-flex bg-gray-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gray-900">
              {study.area}
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-gray-950 md:text-6xl">{study.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">{study.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {study.tech.map((tech) => (
              <span key={tech} className="border border-gray-200 px-3 py-1.5 text-sm text-gray-600">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {study.thumbnail && (
          <div className="mt-12 overflow-hidden border border-gray-200 bg-gray-50 p-4 md:p-6">
            <Image
              src={study.thumbnail}
              alt={`${study.title} conference proof`}
              width={1126}
              height={636}
              className="h-auto w-full"
            />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Conference proof · Singapore · 2026</p>
          </div>
        )}

        {fullText ? (
          <MarkdownArticle markdown={fullText} />
        ) : (
          <div className="mt-12 grid gap-10 border-t border-gray-200 pt-10 md:grid-cols-2">
            <Detail title="Project overview" body={study.overview} />
            <Detail title="What I built" body={study.built} />
            <Detail title="How I delivered" body={study.delivered} />
          </div>
        )}
      </article>
    </main>
  );
}

function Detail({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">{title}</p>
      <p className="text-base leading-8 text-gray-600">{body}</p>
    </section>
  );
}

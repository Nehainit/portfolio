import Link from "next/link";
import ProjectsSection from "@/components/ProjectsSection";
import { caseStudies } from "@/lib/caseStudies";

const navItems = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Case Studies", "/case-studies"],
  ["Socials", "/socials"],
];

export default function ProjectsPage() {
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
                label === "Projects"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <ProjectsSection
        eyebrow="Projects"
        heading="Things I’ve built."
        items={caseStudies.filter((study) => !["margin-intelligence", "lap-credit-risk-intelligence"].includes(study.slug))}
        projectLinks
      />
    </main>
  );
}

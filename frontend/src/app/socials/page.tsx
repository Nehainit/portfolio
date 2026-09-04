"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const socials = [
  {
    name: "Email",
    handle: "nehadubey1021@gmail.com",
    description: "For collaborations, AI systems, and project conversations.",
    href: "mailto:nehadubey1021@gmail.com",
    icon: <EmailIcon />,
    color: "bg-gray-900 text-white",
  },
  {
    name: "GitHub",
    handle: "Nehainit",
    description: "AI, RAG, data engineering, and automation projects.",
    href: "https://github.com/Nehainit",
    icon: <GitHubIcon />,
    color: "bg-gray-100 text-gray-900",
  },
  {
    name: "LinkedIn",
    handle: "nehadubey11",
    description: "Professional updates on AI and data engineering.",
    href: "https://www.linkedin.com/in/nehadubey11/",
    icon: <LinkedInIcon />,
    color: "bg-gray-100 text-gray-700",
  },
  {
    name: "X (Twitter)",
    handle: "@aboutneha",
    description: "Updates on AI, data engineering, and projects.",
    href: "https://x.com/aboutneha",
    icon: <XIcon />,
    color: "bg-gray-900 text-white",
  },
];

const navItems = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Case Studies", "/case-studies"],
  ["Socials", "/socials"],
];

export default function SocialsPage() {
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
                label === "Socials"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.p className="mb-3 text-sm uppercase tracking-[0.18em] text-gray-400" variants={fadeUp}>
            Socials
          </motion.p>
          <motion.h1 className="text-3xl font-medium tracking-tight text-gray-950 md:text-5xl" variants={fadeUp}>
            Let&apos;s connect.
          </motion.h1>
        </motion.div>

        <div className="space-y-5">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-5 rounded-3xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg md:gap-7 md:p-7"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl md:h-20 md:w-20 ${social.color}`}>
                {social.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-semibold text-gray-950 md:text-2xl">{social.name}</span>
                <span className="mt-1 block truncate text-sm font-medium text-gray-500 md:text-base">{social.handle}</span>
                <span className="mt-3 block max-w-2xl text-sm leading-6 text-gray-600 md:text-base">{social.description}</span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 text-xl text-gray-500 transition-all group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2.774 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.964 6.817H1.684l7.73-8.835L1.255 2.25h6.826l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

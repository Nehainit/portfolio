"use client";

const navItems = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Case Studies", "/case-studies"],
  ["Socials", "/socials"],
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white/95 px-6 py-5 backdrop-blur-sm md:px-10">
      <a
        href="https://github.com/Nehainit"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full px-3 py-1.5 text-sm text-gray-500 transition-all duration-300 hover:bg-gray-900 hover:text-white"
      >
        GitHub
      </a>
      <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-1 md:gap-2">
        {navItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-2 py-1.5 text-xs text-gray-500 transition-all duration-300 hover:bg-gray-900 hover:text-white md:px-3 md:text-sm"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

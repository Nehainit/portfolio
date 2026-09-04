"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const experience = [
  {
    role: "Gen AI Developer (Freelance)",
    company: "Fintech Clients",
    period: "Dec 2025 – Present",
    bullets: [
      "Built an XGBoost credit-risk scoring engine with SHAP interpretability and an AI assistant for retrieving historical underwriting explanations.",
      "Developed, trained, and integrated ML models across Margin Intelligence and LAP, including XGBoost risk scoring, XGBClassifier for credit approval, XGBRegressor for probability-of-default estimation, and SHAP TreeExplainer for model interpretability.",
      "Automated loan-underwriting cash-flow assessment with an OCR-powered bank-statement extractor that produces structured FOIR, DTI, and spending profiles.",
      "Engineered a reusable multi-format OCR module for document classification and field extraction across fintech onboarding workflows.",
      "Built an OCR comparison workflow to evaluate extraction quality across document-processing approaches and select reliable pipelines.",
      "Implemented a HITL compliance layer for low-confidence extraction review and PAN/Aadhaar authenticity verification using HMAC-SHA256.",
      "Integrated a GitHub SCM SDK/API to save and push encrypted workflow exports directly to repositories with branch and file-path support.",
    ],
    tags: ["Python", "XGBoost", "SHAP", "OCR", "OCR Evaluation", "RAG", "GitHub SCM", "HITL"],
  },
  {
    role: "Associate Data Engineer",
    company: "Cummins Inc.",
    period: "Jun 2024 – Aug 2025",
    bullets: [
      "Owned data ingestion across 8+ global manufacturing plants using Qlik Replicate and Apache Spark for real-time and batch pipelines.",
      "Migrated legacy Oracle infrastructure to a scalable data lake, rewriting complex queries for MySQL and rebuilding SSIS ETL pipelines without data loss.",
      "Deployed Databricks PySpark workflows for large-scale manufacturing sensor data, reducing pipeline latency and recurring job failures.",
      "Enforced schema standards and data quality across Databricks and Snowflake ingestion layers.",
    ],
    tags: ["Qlik Replicate", "Apache Spark", "Databricks", "Snowflake", "PySpark", "SSIS"],
  },
  {
    role: "Data Engineer",
    company: "Infomo India Pvt. Ltd.",
    period: "Jan 2023 – Jun 2024",
    bullets: [
      "Built real-time campaign analytics pipelines and dashboards using Kafka, Apache Druid, PySpark, and FastAPI.",
      "Built a rule-based campaign recommendation engine that identified low-CTR audience segments for proactive advertiser-spend reallocation.",
      "Segmented telecom subscribers into behavioural profiles using TF-IDF and K-Means clustering.",
    ],
    tags: ["Kafka", "Apache Druid", "PySpark", "FastAPI", "TF-IDF", "K-Means"],
  },
  {
    role: "Data Science Intern",
    company: "YMeet LLC",
    period: "May 2022 – Jun 2022",
    bullets: ["Built a generative Q&A chatbot using Hugging Face T5 Transformers, fine-tuned on custom datasets compiled through web scraping with BeautifulSoup."],
    tags: ["Python", "T5 Transformers", "BeautifulSoup", "NLP"],
  },
];

const navItems = [
  ["Home", "/"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Case Studies", "/case-studies"],
  ["Socials", "/socials"],
];

export default function ExperiencePage() {
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
                label === "Experience"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-gray-400">Experience</p>
          <h1 className="text-3xl font-medium tracking-tight text-gray-950 md:text-5xl">Where I&apos;ve worked.</h1>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gray-200 md:left-5" />
          <motion.div
            className="space-y-14 pb-20"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {experience.map((item) => (
              <motion.article
                key={`${item.company}-${item.role}`}
                variants={fadeUp}
                className="relative pl-12 md:pl-20"
              >
                <span className="absolute left-0 top-1.5 h-7 w-7 rounded-full border-2 border-gray-700 bg-white md:left-2" />
                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:gap-10">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">{item.role}</h2>
                    <p className="mt-3 flex items-center gap-2 text-lg font-medium text-gray-700">
                      <span aria-hidden="true">▣</span>
                      {item.company}
                    </p>
                  </div>
                  <time className="h-fit rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500">
                    {item.period}
                  </time>
                </div>

                <ul className="mt-6 max-w-4xl space-y-4 text-base leading-7 text-gray-600 md:text-lg">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-6">
                      <span className="absolute left-0 text-gray-400">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="border border-gray-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

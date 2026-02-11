"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "./ProjectCard";
import { easeOutExpo } from "@/lib/animations";

// Extended project details
const projectDetails: Record<
  string,
  { description: string; features: string[]; tech: string[] }
> = {
  rag: {
    description:
      "A private, locally-hosted Retrieval-Augmented Generation system designed for criminal defense law firms in Illinois. All data stays on your local machine - no cloud services required.",
    features: [
      "100% local processing - no cloud dependencies",
      "Document ingestion with OCR support",
      "Semantic search over legal documents",
      "GPU-accelerated inference (RTX 4090 recommended)",
    ],
    tech: ["Python", "Docker", "Ollama", "FastAPI", "Vector DB", "OCR"],
  },
  ats: {
    description:
      "An intelligent applicant tracking system with AI agents for resume analysis, candidate matching, and automated screening.",
    features: [
      "AI-powered resume parsing and analysis",
      "Intelligent candidate-job matching",
      "Multi-agent architecture for complex workflows",
      "Full-stack application with modern UI",
    ],
    tech: ["Python", "TypeScript", "Streamlit", "AI Agents"],
  },
  etl: {
    description:
      "An intelligent system leveraging LLMs to automatically identify data schemas, establish column mappings between different sources, and produce transformation rules.",
    features: [
      "Automatic schema detection using LLMs",
      "Intelligent column mapping suggestions",
      "AI-suggested data transformations",
      "Support for CSV, JSON, Excel, and databases",
    ],
    tech: ["Python 3.11+", "Claude/GPT-4", "FastAPI", "Streamlit", "Pandas", "SQLAlchemy"],
  },
  dqm: {
    description:
      "A comprehensive system for monitoring data quality in real-time that identifies anomalies, leverages AI to explain issues, and distributes alerts via multiple channels.",
    features: [
      "7 types of quality checks (null, duplicate, type, range, pattern, freshness, volume)",
      "Statistical anomaly detection (Z-score, distribution analysis)",
      "AI-powered root cause analysis in plain English",
      "Multi-channel alerts (Slack, Email)",
    ],
    tech: ["Python", "Kafka", "Redis", "Streamlit", "Plotly", "Claude/GPT-4"],
  },
  bank: {
    description:
      "An AI-powered document extraction system using Claude API to parse unstructured bank statements into structured JSON data with transaction details, account info, and summaries.",
    features: [
      "PDF to structured JSON extraction",
      "Intelligent field mapping for multiple bank formats",
      "Transaction categorization and summarization",
      "Export to CSV for further analysis",
    ],
    tech: ["Python", "Claude API", "Streamlit", "Tesseract OCR", "Poppler"],
  },
  report: {
    description:
      "An AI-powered system that automatically generates professional business reports from multiple data sources with AI-generated insights.",
    features: [
      "Connect to PostgreSQL, MySQL, SQLite, CSV, Google Sheets, REST APIs",
      "AI-generated insights and recommendations",
      "PDF, HTML, Markdown output formats",
      "Automated Slack/Email delivery",
    ],
    tech: ["Python 3.11+", "FastAPI", "LangChain", "Streamlit", "Plotly", "Docker"],
  },
  cashflow: {
    description:
      "A financial analysis workflow built with Langflow for intelligent cash flow statement analysis and insights generation.",
    features: [
      "Visual workflow builder with Langflow",
      "Automated cash flow analysis",
      "AI-powered financial insights",
      "Easy to customize and extend",
    ],
    tech: ["Langflow", "LLM", "Financial Analysis"],
  },
  credit: {
    description:
      "An AI-driven credit risk scoring workflow built with Langflow for automated risk analysis and decision support.",
    features: [
      "Visual risk assessment pipeline",
      "AI-powered risk scoring",
      "Configurable risk parameters",
      "Decision support recommendations",
    ],
    tech: ["Langflow", "Risk Modeling", "LLM"],
  },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const details = project ? projectDetails[project.id] : null;

  return (
    <AnimatePresence>
      {project && details && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 pr-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {project.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {details.description}
            </motion.p>

            {/* Technologies */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {details.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Key Features
              </h4>
              <ul className="space-y-2">
                {details.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <span className="text-gray-500 mt-1">→</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* GitHub Link */}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ x: 4 }}
              >
                View on GitHub
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

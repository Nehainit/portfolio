"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProjectCard, { Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionDivider from "./SectionDivider";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

// Project Data
const projects: Project[] = [
  {
    id: "rag",
    title: "RAG Criminal Defense Research",
    description: "Private, locally-hosted RAG system for law firms",
    tags: ["RAG", "LangChain", "Ollama", "Docker"],
    category: ["llm"],
    githubUrl: "https://github.com/Nehainit/RAG_criminal-defense-research",
    gradient: "bg-gradient-to-br from-slate-900 to-slate-700",
    icon: <RAGIcon />,
  },
  {
    id: "ats",
    title: "AI-Powered ATS",
    description: "Intelligent applicant tracking with AI agents",
    tags: ["AI Agents", "Python", "TypeScript"],
    category: ["llm"],
    githubUrl: "https://github.com/Nehainit/AI-powered-ATS",
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
    icon: <ATSIcon />,
  },
  {
    id: "etl",
    title: "AI-Powered ETL Pipeline",
    description: "LLM-driven automatic schema detection & mapping",
    tags: ["LLM", "ETL", "FastAPI", "Claude"],
    category: ["llm", "data"],
    githubUrl: "https://github.com/Nehainit/AI-ETL-PIPELINE",
    gradient: "bg-gradient-to-br from-gray-100 to-gray-200",
    icon: <ETLIcon />,
  },
  {
    id: "dqm",
    title: "Real-Time Data Quality Monitor",
    description: "AI-powered anomaly detection & root cause analysis",
    tags: ["Kafka", "Streamlit", "Claude API"],
    category: ["data"],
    githubUrl: "https://github.com/Nehainit/data-quality-monitor",
    gradient: "bg-gradient-to-br from-gray-50 to-gray-150",
    icon: <DQMIcon />,
  },
  {
    id: "bank",
    title: "Bank Statement Extractor",
    description: "AI document extraction with Claude API",
    tags: ["Claude API", "OCR", "Streamlit"],
    category: ["llm"],
    githubUrl: "https://github.com/Nehainit/bank-statment-extractor",
    gradient: "bg-gradient-to-br from-gray-100 to-gray-200",
    icon: <BankIcon />,
  },
  {
    id: "report",
    title: "Automated Report Generator",
    description: "LLM-powered business intelligence reports",
    tags: ["LangChain", "FastAPI", "Multi-source"],
    category: ["llm", "data"],
    githubUrl: "https://github.com/Nehainit/automated-report-generator",
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
    icon: <ReportIcon />,
  },
  {
    id: "cashflow",
    title: "Cash Flow Intelligence",
    description: "Financial analysis workflow built with Langflow",
    tags: ["Langflow", "LLM", "Finance"],
    category: ["llm"],
    gradient: "bg-gradient-to-br from-slate-800 to-slate-900",
    icon: <LangflowIcon label="Cash Flow" />,
  },
  {
    id: "credit",
    title: "Credit Risk Assessment",
    description: "AI-driven credit risk scoring workflow",
    tags: ["Langflow", "Risk Analysis", "AI"],
    category: ["llm"],
    gradient: "bg-gradient-to-br from-slate-800 to-gray-900",
    icon: <LangflowIcon label="Risk Score" />,
  },
];

const filters = [
  { id: "all", label: "All Projects", icon: <GridIcon /> },
  { id: "llm", label: "LLM/RAG", icon: <AIIcon /> },
  { id: "data", label: "Data Engineering", icon: <DataIcon /> },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category.includes(activeFilter)
  );

  return (
    <section className="px-6 md:px-10 max-w-6xl mx-auto">
      <SectionDivider title="Selected Work" />

      {/* Filter Buttons */}
      <motion.div
        className="flex justify-center gap-2 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            }`}
            variants={fadeUp}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            {filter.icon}
            {filter.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

// Icon Components
function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

// Project Preview Icons
function RAGIcon() {
  return (
    <div className="flex gap-3">
      <div className="bg-slate-800 rounded-lg p-4 shadow-xl">
        <div className="space-y-1.5 font-mono text-[10px]">
          <div className="text-gray-400">from langchain import RAG</div>
          <div className="text-gray-400">from ollama import LLM</div>
          <div className="text-gray-500"># Vector search</div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
        <div className="bg-gray-700 text-white text-[10px] px-3 py-1.5 rounded-lg mb-2">
          Query legal docs...
        </div>
        <div className="bg-white text-gray-600 text-[10px] px-3 py-1.5 rounded-lg border">
          Based on Illinois...
        </div>
      </div>
    </div>
  );
}

function ATSIcon() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-lg text-center">
      <div className="text-3xl font-bold text-gray-700 mb-1">87%</div>
      <div className="text-xs text-gray-500 mb-3">Match Score</div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-[87%] bg-gradient-to-r from-gray-500 to-gray-700 rounded-full" />
      </div>
    </div>
  );
}

function ETLIcon() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold">
        CSV
      </div>
      <div className="text-gray-400 text-lg">→</div>
      <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold">
        AI
      </div>
      <div className="text-gray-400 text-lg">→</div>
      <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold">
        DB
      </div>
    </div>
  );
}

function DQMIcon() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex gap-3 mb-3">
        <div className="bg-gray-100 rounded-lg p-2 text-center flex-1">
          <div className="text-lg font-bold text-gray-700">99.2%</div>
          <div className="text-[10px] text-gray-500">Completeness</div>
        </div>
        <div className="bg-gray-200 rounded-lg p-2 text-center flex-1">
          <div className="text-lg font-bold text-gray-600">94.1%</div>
          <div className="text-[10px] text-gray-500">Accuracy</div>
        </div>
      </div>
      <div className="bg-gray-200 text-gray-700 text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2">
        <span className="w-4 h-4 bg-gray-600 text-white rounded-full flex items-center justify-center text-[8px]">
          !
        </span>
        Anomaly detected
      </div>
    </div>
  );
}

function BankIcon() {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-gray-700 text-white px-4 py-3 rounded-lg text-sm font-bold">
        PDF
      </div>
      <div className="text-gray-400 text-2xl">→</div>
      <div className="bg-slate-800 text-[10px] font-mono p-3 rounded-lg text-gray-300">
        <span className="text-gray-400">&quot;transactions&quot;</span>: [...]
      </div>
    </div>
  );
}

function ReportIcon() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gray-700 rounded text-white flex items-center justify-center text-sm">
          +
        </div>
        <span className="text-sm font-semibold">Q4 Report</span>
      </div>
      <div className="bg-gray-100 rounded-lg p-2 text-[10px] text-gray-600 mb-3">
        <span className="bg-gray-700 text-white px-1.5 py-0.5 rounded text-[8px] mr-1">
          AI
        </span>
        Revenue increased 23%...
      </div>
      <div className="flex gap-1 h-8 items-end">
        <div className="flex-1 bg-gradient-to-t from-gray-600 to-gray-800 rounded-sm h-[60%]" />
        <div className="flex-1 bg-gradient-to-t from-gray-600 to-gray-800 rounded-sm h-[80%]" />
        <div className="flex-1 bg-gradient-to-t from-gray-600 to-gray-800 rounded-sm h-[45%]" />
        <div className="flex-1 bg-gradient-to-t from-gray-600 to-gray-800 rounded-sm h-full" />
      </div>
    </div>
  );
}

function LangflowIcon({ label }: { label: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-gray-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
          Input
        </div>
        <div className="w-6 h-0.5 bg-gray-600" />
        <div className="bg-gray-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
          LLM
        </div>
        <div className="w-6 h-0.5 bg-gray-600" />
        <div className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
          Output
        </div>
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

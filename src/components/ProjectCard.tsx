"use client";

import { motion } from "motion/react";
import { cardVariants } from "@/lib/animations";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string[];
  githubUrl?: string;
  gradient: string;
  icon: React.ReactNode;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      variants={cardVariants}
      custom={index}
      whileHover={{
        scale: 0.97,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gray-300/40 group-hover:border-gray-200">
        {/* Preview Area */}
        <div
          className={`h-52 md:h-60 p-6 flex items-center justify-center ${project.gradient}`}
        >
          <motion.div
            className="transform transition-transform duration-500 group-hover:scale-95"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {project.icon}
          </motion.div>
        </div>

        {/* Info Area */}
        <div className="p-5 bg-white transition-colors duration-300 group-hover:bg-gray-900">
          <h3 className="text-base font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-white">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-1 transition-colors duration-300 group-hover:text-gray-400">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600 transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

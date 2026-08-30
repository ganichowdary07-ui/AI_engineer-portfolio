import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, X, CheckCircle2, Layers } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import type { ProjectItem, ProjectCategory } from '../types/portfolio';
import { GithubIcon } from './icons/SocialIcons';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = ['All', 'Prompt Engineering', 'AI', 'Analytics', 'Other'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category.includes(selectedCategory));

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Portfolio Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Projects Showcase & <span className="gradient-text-cyan">Demos</span>
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(category => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-105'
                    : 'glass-panel text-slate-400 hover:text-slate-200 hover:border-cyan-500/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-xl group flex flex-col justify-between"
              >
                {/* Project Image Header */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.category.map(cat => (
                      <span key={cat} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      View Details & Highlights
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      
                      <a
                        href={project.liveDemoUrl}
                        onClick={(e) => {
                          if (project.liveDemoUrl === '#') {
                            e.preventDefault();
                            alert(`Live preview for ${project.title} will be launched soon!`);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Live Demo"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Detail View */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl z-10 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <p className="leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>

                  {selectedProject.highlights && (
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-2 text-xs uppercase tracking-wider">Key Technical Highlights</h4>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-slate-400 mb-2 text-xs uppercase tracking-wider">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded bg-slate-900 text-cyan-400 text-xs font-mono border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub Code
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

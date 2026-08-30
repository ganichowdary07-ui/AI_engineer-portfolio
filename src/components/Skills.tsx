import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code2, Database, Brain, Wrench, CheckCircle2, BookOpen } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('prompt-eng');

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'prompt-eng': return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'prog': return <Code2 className="w-4 h-4" />;
      case 'backend': return <Database className="w-4 h-4" />;
      case 'ai-analytics': return <Cpu className="w-4 h-4" />;
      case 'tools': return <Wrench className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const currentCategoryData = skillCategories.find(c => c.id === activeCategory) || skillCategories[0];

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Skills & <span className="gradient-text-cyan">Competencies</span>
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {skillCategories.map(category => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-105'
                    : 'glass-panel text-slate-400 hover:text-slate-200 hover:border-cyan-500/40'
                }`}
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="font-medium text-slate-300">Comfortable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400/50" />
            <span className="font-medium text-slate-300">Currently Learning</span>
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {currentCategoryData.skills.map((skill, index) => {
              const isComfortable = skill.level === 'Comfortable';
              return (
                <div
                  key={skill.name}
                  className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isComfortable ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                        {isComfortable ? <CheckCircle2 className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors text-sm sm:text-base">
                        {skill.name}
                      </span>
                    </div>

                    {/* Level Pill */}
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        isComfortable
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-mono">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-slate-200 overflow-hidden p-0.5 border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                        className={`h-full rounded-full ${
                          isComfortable
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                            : 'bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-sm shadow-cyan-500/50'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

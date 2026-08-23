import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Code2, Terminal, Globe, BarChart3, Brain, Sparkles, CheckCircle, Clock, Target } from 'lucide-react';
import { journeySteps } from '../data/portfolioData';

export const Journey: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-indigo-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-purple-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-300" />;
      default: return <Compass className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
            <Clock className="w-3 h-3 animate-spin" />
            Active Focus
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-bold">
            <Target className="w-3 h-3" />
            Target Goal
          </span>
        );
    }
  };

  return (
    <section id="journey" className="py-20 relative z-10">
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
            <Compass className="w-3.5 h-3.5" />
            <span>Career Path Roadmap</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            My Journey Toward <span className="gradient-text-cyan">AI Engineering</span>
          </motion.h2>

          <p className="max-w-2xl text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
            Ganesh is currently building hands-on skills, practical projects, and mathematical foundations toward a specialized career in Artificial Intelligence Engineering.
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Step Progression Flow Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeySteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-xl relative group flex flex-col justify-between"
            >
              {/* Top Row */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                      0{step.step}
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>

                  {getStatusBadge(step.status)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Technologies Badges */}
              <div className="pt-4 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                {step.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/60 text-slate-400 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

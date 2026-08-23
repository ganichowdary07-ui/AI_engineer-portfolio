import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Award, BookOpen, CheckCircle2, Sparkles, Target, Compass } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case 'Award': return <Award className="w-6 h-6 text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-indigo-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-20 relative z-10">
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
            <User className="w-3.5 h-3.5" />
            <span>Profile & Aspirations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            About <span className="gradient-text-cyan">Me</span>
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Bio Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none" />

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {personalInfo.aboutBio.map((paragraph, idx) => (
                <p key={idx} className="relative z-10">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Highlights */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Career Focus</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Artificial Intelligence & Machine Learning Engineering</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Current Institution</h4>
                  <p className="text-xs text-slate-400 mt-0.5">SRKR Engineering College, Bhimavaram</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated Statistics Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {personalInfo.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-lg relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-60 transition-opacity">
                  {getIcon(stat.iconName)}
                </div>

                <div className="p-2 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 w-fit mb-4">
                  {getIcon(stat.iconName)}
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {stat.label}
                  </div>
                  <div className="text-xs font-semibold text-cyan-500 dark:text-cyan-400 mt-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {stat.sublabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School, BookMarked, MapPin, Calendar } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  const getEduIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'School': return <School className="w-5 h-5 text-emerald-400" />;
      case 'BookMarked': return <BookMarked className="w-5 h-5 text-indigo-400" />;
      default: return <GraduationCap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Education <span className="gradient-text-cyan">Timeline</span>
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative border-l-2 border-slate-800 dark:border-slate-800 light:border-slate-300 ml-4 sm:ml-32 space-y-12">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 dark:bg-slate-950 light:bg-white border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Time Label (Desktop Left Floating) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
                <span className="text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 block">
                  {item.period}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">
                  {item.status}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-xl group-hover:-translate-y-1 relative">
                
                {/* Mobile Period Badge */}
                <div className="sm:hidden flex items-center justify-between mb-3 text-xs font-mono text-cyan-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[10px] uppercase font-bold border border-cyan-500/20">
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800">
                        {getEduIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                          {item.institution}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grade Pill */}
                  <div className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold shadow-sm">
                    {item.grade}
                  </div>
                </div>

                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {item.degree}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Endorsements & Recommendations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Recommendations & <span className="gradient-text-cyan">Feedback</span>
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Clear Coming Soon Placeholder Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800/80 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-4 right-4 text-cyan-500/10 pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/10">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          {/* Explicit Label requested in Prompt */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-500/30">
            Testimonials coming soon
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Academic & Mentor Endorsements Space
          </h3>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
            This section is prepared to showcase recommendations and feedback from professors, project mentors, hackathon teammates, and internship supervisors as Ganesh advances through academic and professional collaborations.
          </p>

          {/* Placeholder Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left opacity-60">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 border-dashed">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">P</div>
                <div>
                  <div className="text-xs font-bold text-slate-300">Professor / Academic Mentor</div>
                  <div className="text-[10px] text-slate-500">SRKR Engineering College</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">"Placeholder for academic feedback..."</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 border-dashed">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">M</div>
                <div>
                  <div className="text-xs font-bold text-slate-300">Project Collaborator / Mentor</div>
                  <div className="text-[10px] text-slate-500">Technical Team / Hackathon</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">"Placeholder for project endorsement..."</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

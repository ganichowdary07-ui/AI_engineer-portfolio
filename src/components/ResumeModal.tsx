import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';
import { personalInfo, educationData, skillCategories } from '../data/portfolioData';
import { downloadResume } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    downloadResume();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyan-500/20 max-h-[90vh] flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Gurram_Ganesh_Resume.pdf
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official Resume Preview • 3rd Year B.Tech CSE Student
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6 text-sm text-slate-700 dark:text-slate-300 pr-2">
              {/* Header section */}
              <div className="bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 p-5 rounded-xl border border-slate-800 dark:border-slate-800">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {personalInfo.name}
                </h4>
                <p className="text-cyan-500 font-medium mb-3">
                  {personalInfo.professionalTitles.join(' | ')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.phone}
                  </span>
                </div>
              </div>

              {/* Education summary */}
              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Education
                </h5>
                <div className="space-y-3">
                  {educationData.map(edu => (
                    <div key={edu.id} className="p-3.5 rounded-lg bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800/80 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {edu.institution} — <span className="text-xs text-slate-400">{edu.location}</span>
                        </div>
                        <div className="text-xs text-slate-400">{edu.degree} ({edu.period})</div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start sm:self-center">
                        {edu.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical skills */}
              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Key Skills & Competencies
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillCategories.map(cat => (
                    <div key={cat.id} className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/60">
                      <div className="text-xs font-semibold text-cyan-400 mb-1.5">{cat.name}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map(s => (
                          <span key={s.name} className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-800/50 flex items-start gap-2 text-xs text-cyan-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Official Resume File: Clicking download saves <strong>Gurram_Ganesh_Resume.pdf</strong> with full academic and skills breakdown for recruiters and mentors.
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                Close Preview
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

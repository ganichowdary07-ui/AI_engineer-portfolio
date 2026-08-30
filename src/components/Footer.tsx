import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center border border-cyan-500/30 text-sm">
                GG
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{personalInfo.name}</h3>
            </div>
            <p className="text-xs text-slate-400">
              AI Engineer Learner | Prompt Engineering Learner | Analytical Skills Learner
            </p>
            <p className="text-xs font-mono text-cyan-400 italic">
              "Learning. Building. Improving."
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-panel hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-panel hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href={personalInfo.socials.email}
              className="p-2.5 rounded-xl glass-panel hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl glass-panel text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by AI & Prompt Engineering</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

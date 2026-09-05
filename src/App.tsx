import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GitHubSection } from './components/GitHubSection';
import { Journey } from './components/Journey';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { VisitorCounter } from './components/VisitorCounter';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AIAssistant } from './components/AIAssistant';
import { AdminPortal } from './components/AdminPortal';

export function AppContent() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);

  // Listen for #admin URL hash or keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setAdminPortalOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminPortalOpen(prev => !prev);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 transition-colors duration-300 relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero onOpenResume={() => setResumeModalOpen(true)} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <GitHubSection />
        <Journey />
        <Experience />
        <Contact />
        <VisitorCounter />
      </main>

      {/* Footer with Admin Portal trigger */}
      <Footer onOpenAdmin={() => setAdminPortalOpen(true)} />

      {/* Download / View Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Admin Portal Dashboard Modal */}
      <AdminPortal
        isOpen={adminPortalOpen}
        onClose={() => {
          setAdminPortalOpen(false);
          if (window.location.hash === '#admin') {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
      />

      {/* Gani's AI Assistant & Noupe Bot Widget */}
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

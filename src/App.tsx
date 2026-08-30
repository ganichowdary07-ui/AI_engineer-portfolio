import { useState } from 'react';
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

export function AppContent() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

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

      {/* Footer */}
      <Footer />

      {/* Download / View Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
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

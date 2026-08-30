import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, X, Minimize2, User } from 'lucide-react';
import { personalInfo, educationData, skillCategories, projectsData } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: Message = {
    id: 'msg-1',
    sender: 'bot',
    text: `Hello! 👋 I am **Gani's AI Assistant**.\n\nI can help you explore Gurram Ganesh's skills, projects, academic record at SRKR Engineering College, or how to get in touch with him! How can I assist you today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const quickQuestions = [
    { label: "🚀 Gani's Projects", query: "What projects has Gani built?" },
    { label: "🎓 Education Details", query: "Tell me about Gani's education and college." },
    { label: "💻 Technical Skills", query: "What programming languages and tools does Gani know?" },
    { label: "📫 How to Contact Gani", query: "How can I contact Gani?" }
  ];

  const generateBotResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('ats')) {
      const projs = projectsData.map(p => `• **${p.title}**: ${p.description} (${p.technologies.join(', ')})`).join('\n\n');
      return `Here are the key projects Gani has developed:\n\n${projs}\n\nYou can view full details in the **Projects** section!`;
    }

    if (q.includes('skill') || q.includes('python') || q.includes('prompt') || q.includes('code') || q.includes('language') || q.includes('tool')) {
      const skills = skillCategories.map(c => `• **${c.name}**: ${c.skills.map(s => s.name).join(', ')}`).join('\n');
      return `Gani possesses strong skills across programming, prompt engineering, and data analytics:\n\n${skills}\n\nHe is currently focusing on **Artificial Intelligence & Machine Learning**!`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('srkr') || q.includes('cgpa') || q.includes('school')) {
      const edus = educationData.map(e => `• **${e.institution}** (${e.period}): ${e.degree} - ${e.grade}`).join('\n\n');
      return `Here is Gani's academic background:\n\n${edus}\n\nHe is currently a **3rd Year B.Tech CSE student** at **SRKR Engineering College, Bhimavaram**.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone') || q.includes('linkedin')) {
      return `You can reach **Gurram Ganesh** directly through:\n\n📧 **Email**: ${personalInfo.email}\n📱 **Phone**: ${personalInfo.phone}\n💼 **LinkedIn**: [Ganesh's LinkedIn Profile](${personalInfo.socials.linkedin})\n🐙 **GitHub**: [github.com/ganichowdary07-ui](${personalInfo.socials.github})\n📍 **Location**: ${personalInfo.location}`;
    }

    if (q.includes('who') || q.includes('gani') || q.includes('gurram') || q.includes('about') || q.includes('goal')) {
      return `**Gurram Ganesh** is a 3rd Year Computer Science Engineering student at SRKR Engineering College, Bhimavaram.\n\n🎯 **Career Goal**: AI Engineer\n💡 **Focus**: Building intelligent solutions using Python, Machine Learning, Data Analytics, and Prompt Engineering.\n\n"${personalInfo.introText}"`;
    }

    return `Thank you for asking! Gani is a passionate AI Engineer Learner & Prompt Engineering Learner who builds practical tech solutions. You can check his **Education**, **Skills**, **Projects**, or **Contact** section for more details. Is there anything specific you'd like to know?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateBotResponse(text);
      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Ask Gani's AI Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-500 p-0.5 shadow-xl shadow-cyan-500/25 flex items-center justify-center cursor-pointer group"
          aria-label="Toggle Gani's AI Assistant"
        >
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 group-hover:bg-slate-900 transition-colors">
            {isOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <div className="relative">
                <Bot className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            )}
          </div>
        </motion.button>
      </div>

      {/* Main Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] z-50 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-100 text-sm tracking-tight">Gani's AI Assistant</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Gurram Ganesh • Portfolio Bot</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Minimize Chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed text-[12.5px]">
                        {msg.text}
                      </div>
                      <div
                        className={`text-[9.5px] mt-1 text-right ${
                          msg.sender === 'user' ? 'text-slate-900/70 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3 py-2 bg-slate-900/40 border-t border-slate-800/60 overflow-x-auto flex gap-1.5 no-scrollbar">
                {quickQuestions.map((qq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qq.query)}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {qq.label}
                  </button>
                ))}
              </div>

              {/* Input Field */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Gani's Assistant anything..."
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  className={`p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 transition-all ${
                    input.trim() ? 'opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-cyan-500/20' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

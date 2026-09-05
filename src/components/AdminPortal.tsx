import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  FolderGit2,
  Activity,
  LogOut,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Edit2,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';
import {
  loginAdmin,
  getAdminMe,
  getAdminContactMessages,
  updateAdminContactStatus,
  deleteAdminContactMessage,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  fetchProjects,
  fetchVisitorCount,
  API_BASE_URL,
  type AdminUser,
  type AdminContactMessage
} from '../services/api';
import type { ProjectItem } from '../types/portfolio';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('portfolio_admin_token'));
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'system'>('messages');

  // Login form state
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Messages state
  const [messages, setMessages] = useState<AdminContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Visitor & System status
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [serverHealth, setServerHealth] = useState<'healthy' | 'checking' | 'offline'>('checking');

  // Check existing token on mount or when token changes
  useEffect(() => {
    if (token) {
      getAdminMe(token).then(res => {
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          // Token expired
          handleLogout();
        }
      });
    }
  }, [token]);

  // Check server health
  const checkHealth = async () => {
    setServerHealth('checking');
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        setServerHealth('healthy');
      } else {
        setServerHealth('offline');
      }
    } catch {
      setServerHealth('offline');
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
      fetchVisitorCount().then(setVisitorCount);
    }
  }, [isOpen]);

  // Load messages when tab or filter changes
  useEffect(() => {
    if (isOpen && token && activeTab === 'messages') {
      loadMessages();
    }
    if (isOpen && activeTab === 'projects') {
      loadProjects();
    }
  }, [isOpen, token, activeTab, statusFilter]);

  const loadMessages = async () => {
    if (!token) return;
    setMessagesLoading(true);
    const res = await getAdminContactMessages(token, statusFilter);
    if (res.success && res.data) {
      setMessages(res.data);
    }
    setMessagesLoading(false);
  };

  const loadProjects = async () => {
    setProjectsLoading(true);
    const list = await fetchProjects();
    setProjects(list);
    setProjectsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    const res = await loginAdmin(identifier, password);
    setLoginLoading(false);

    if (res.success && res.token && res.user) {
      localStorage.setItem('portfolio_admin_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setPassword('');
    } else {
      setLoginError(res.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setUser(null);
    setMessages([]);
  };

  const handleStatusUpdate = async (id: string, newStatus: 'unread' | 'read' | 'replied' | 'archived') => {
    if (!token) return;
    const res = await updateAdminContactStatus(token, id, newStatus);
    if (res.success) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this message?')) return;
    const res = await deleteAdminContactMessage(token, id);
    if (res.success) {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProject) return;

    if (editingProject.id && !isAddingProject) {
      const res = await updateAdminProject(token, editingProject.id, editingProject);
      if (res.success) {
        setEditingProject(null);
        loadProjects();
      }
    } else {
      const res = await createAdminProject(token, editingProject);
      if (res.success) {
        setEditingProject(null);
        setIsAddingProject(false);
        loadProjects();
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !window.confirm('Delete this project permanently?')) return;
    const res = await deleteAdminProject(token, id);
    if (res.success) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Portfolio Admin Center
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                  serverHealth === 'healthy' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : serverHealth === 'checking'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  API: {serverHealth}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {user ? `Logged in as ${user.username} (${user.email})` : 'Secure Administrative Access'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg border border-rose-500/20 transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!user ? (
            /* ================= LOGIN SCREEN ================= */
            <div className="max-w-md mx-auto py-10">
              <div className="text-center space-y-2 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/5">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Administrator Authentication</h3>
                <p className="text-xs text-slate-400">
                  Log in with your administrator credentials to access and manage live portfolio data.
                </p>
              </div>

              {loginError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="admin or email"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loginLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Sign In to Admin Portal</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 font-mono space-y-1">
                  <p className="text-slate-300 font-semibold">Default Seeded Admin Credentials:</p>
                  <p>Username: <span className="text-cyan-400">admin</span></p>
                  <p>Password: <span className="text-cyan-400">AdminPassword123!</span></p>
                </div>
              </form>
            </div>
          ) : (
            /* ================= DASHBOARD SCREEN ================= */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'messages'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Inbox</span>
                  {messages.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                      {messages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projects Manager</span>
                </button>

                <button
                  onClick={() => setActiveTab('system')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'system'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>System & Analytics</span>
                </button>
              </div>

              {/* ================= TAB 1: CONTACT INBOX ================= */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Submitted Messages</h3>
                      <button
                        onClick={loadMessages}
                        disabled={messagesLoading}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="Refresh messages"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${messagesLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
                      {(['all', 'unread', 'read', 'replied'] as const).map(status => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                            statusFilter === status
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {messagesLoading ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                      Loading contact messages...
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-slate-800/80 text-slate-500">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p className="text-sm font-medium text-slate-300">No messages found</p>
                      <p className="text-xs text-slate-500">
                        {statusFilter === 'all'
                          ? 'Messages submitted through your portfolio contact form will appear here.'
                          : `No messages with status "${statusFilter}".`}
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{msg.name}</span>
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                                >
                                  {msg.email}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">
                                Subject: <span className="text-slate-200">{msg.subject}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${
                                msg.status === 'unread'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : msg.status === 'replied'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {msg.status}
                              </span>
                              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(msg.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                            {msg.message}
                          </p>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="text-[11px] text-slate-500">Mark as:</span>
                              {(['unread', 'read', 'replied', 'archived'] as const).map(st => (
                                <button
                                  key={st}
                                  onClick={() => handleStatusUpdate(msg.id, st)}
                                  disabled={msg.status === st}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                                    msg.status === st
                                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 opacity-50 cursor-default'
                                      : 'text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 2: PROJECTS MANAGER ================= */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">Live Portfolio Projects</h3>
                    <button
                      onClick={() => {
                        setEditingProject({
                          title: '',
                          description: '',
                          category: ['AI'],
                          technologies: ['Python'],
                          githubUrl: 'https://github.com/ganichowdary07',
                          liveDemoUrl: '#',
                          featured: true,
                          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
                        });
                        setIsAddingProject(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {/* Edit/Create Project Modal form */}
                  {editingProject && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold text-cyan-400">
                          {isAddingProject ? 'Add New Project' : `Edit Project: ${editingProject.title}`}
                        </h4>
                        <button
                          onClick={() => { setEditingProject(null); setIsAddingProject(false); }}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs text-slate-400 mb-1">Project Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title || ''}
                            onChange={e => setEditingProject(p => ({ ...p, title: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs text-slate-400 mb-1">Description</label>
                          <textarea
                            required
                            rows={3}
                            value={editingProject.description || ''}
                            onChange={e => setEditingProject(p => ({ ...p, description: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">GitHub URL</label>
                          <input
                            type="text"
                            value={editingProject.githubUrl || ''}
                            onChange={e => setEditingProject(p => ({ ...p, githubUrl: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Live Demo URL</label>
                          <input
                            type="text"
                            value={editingProject.liveDemoUrl || ''}
                            onChange={e => setEditingProject(p => ({ ...p, liveDemoUrl: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="sm:col-span-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="featuredCheck"
                            checked={Boolean(editingProject.featured)}
                            onChange={e => setEditingProject(p => ({ ...p, featured: e.target.checked }))}
                            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                          />
                          <label htmlFor="featuredCheck" className="text-xs text-slate-300">
                            Mark as Featured Project (displayed at top)
                          </label>
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => { setEditingProject(null); setIsAddingProject(false); }}
                            className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                          >
                            Save Project
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {projectsLoading ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                      Loading projects...
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800 gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                              {proj.featured && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.technologies.slice(0, 4).map((tech, i) => (
                                <span key={i} className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-900 text-slate-400 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingProject(proj);
                                setIsAddingProject(false);
                              }}
                              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 3: SYSTEM & ANALYTICS ================= */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        Live Visitor Counter
                      </p>
                      <p className="text-2xl font-mono font-bold text-white">
                        {visitorCount !== null ? visitorCount : '...'}
                      </p>
                      <p className="text-[10px] text-slate-500">Stored in database visitor_stats</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        Backend Server Status
                      </p>
                      <p className="text-base font-bold text-emerald-400 capitalize flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        {serverHealth}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">{API_BASE_URL}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                        Admin Role
                      </p>
                      <p className="text-base font-bold text-white">
                        {user.role}
                      </p>
                      <p className="text-[10px] text-slate-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Database Connection & Endpoint Diagnostics
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={checkHealth}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Ping /api/health</span>
                      </button>

                      <a
                        href={`${API_BASE_URL}/health`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-xs text-cyan-400 flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Inspect Raw Health JSON</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

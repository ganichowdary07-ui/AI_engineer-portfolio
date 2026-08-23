import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, ExternalLink, Code2, AlertCircle, RefreshCw } from 'lucide-react';
import { githubConfig } from '../data/portfolioData';
import type { GitHubRepo, GitHubProfile } from '../types/portfolio';
import { GithubIcon } from './icons/SocialIcons';

export const GitHubSection: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch Profile
      const profileRes = await fetch(`https://api.github.com/users/${githubConfig.username}`);
      if (!profileRes.ok) {
        throw new Error(`GitHub user "${githubConfig.username}" not found or rate limited.`);
      }
      const profileData: GitHubProfile = await profileRes.json();
      setProfile(profileData);

      // Fetch Repos
      const reposRes = await fetch(`https://api.github.com/users/${githubConfig.username}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const reposData: GitHubRepo[] = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err: any) {
      console.warn('GitHub API fetch info:', err.message);
      setError(err.message || 'Unable to load GitHub repositories directly.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-20 relative z-10">
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
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Open Source Activity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            My GitHub <span className="gradient-text-cyan">Activity</span>
          </motion.h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Dynamic Profile Summary or Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-slate-800">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
            <p className="text-sm text-slate-400">Fetching live GitHub activity for {githubConfig.username}...</p>
          </div>
        ) : error ? (
          /* Placeholder Config Card when username is not found or rate limited */
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center max-w-2xl mx-auto space-y-4">
            <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400 w-fit mx-auto">
              <GithubIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              GitHub Profile Integration Ready
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Target Username: <code className="text-cyan-400 font-mono px-2 py-0.5 rounded bg-slate-900">{githubConfig.username}</code>
            </p>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-left space-y-2">
              <div className="flex items-center gap-2 font-semibold text-cyan-400">
                <AlertCircle className="w-4 h-4" />
                Live Configuration Notice
              </div>
              <p>
                {githubConfig.placeholderText}
              </p>
            </div>
            <a
              href={`https://github.com/${githubConfig.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <GithubIcon className="w-4 h-4" />
              Visit GitHub Profile directly
            </a>
          </div>
        ) : (
          /* Profile & Repos List */
          <div className="space-y-8">
            {/* User Banner */}
            {profile && (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.avatar_url}
                    alt={profile.login}
                    className="w-16 h-16 rounded-full border-2 border-cyan-500/40 p-0.5 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      @{profile.login}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {profile.bio || 'Computer Science Engineering Student | Aspiring AI Engineer'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-center">
                  <div>
                    <div className="text-xl font-extrabold text-cyan-400">{profile.public_repos}</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Repositories</div>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <div className="text-xl font-extrabold text-emerald-400">{profile.followers}</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Followers</div>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Repos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map(repo => (
                <div
                  key={repo.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-lg group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2 text-base"
                      >
                        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 min-h-[2rem]">
                      {repo.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      {repo.language || 'Code'}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-purple-400" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

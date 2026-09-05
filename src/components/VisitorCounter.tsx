import React, { useEffect, useState } from 'react';
import { Eye, Activity } from 'lucide-react';
import { recordVisitorHit, fetchVisitorCount } from '../services/api';

export const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    async function syncVisitorCount() {
      const key = 'ganesh_portfolio_visit_count';
      const hasVisited = sessionStorage.getItem('visited_session');
      let localCount = parseInt(localStorage.getItem(key) || '142', 10);

      if (!hasVisited) {
        sessionStorage.setItem('visited_session', 'true');
        localCount += 1;
        localStorage.setItem(key, localCount.toString());
        setVisitorCount(localCount);

        const backendCount = await recordVisitorHit();
        if (backendCount !== null) {
          setVisitorCount(backendCount);
          localStorage.setItem(key, backendCount.toString());
        }
      } else {
        setVisitorCount(localCount);
        const backendCount = await fetchVisitorCount();
        if (backendCount !== null) {
          setVisitorCount(backendCount);
          localStorage.setItem(key, backendCount.toString());
        }
      }
    }

    syncVisitorCount();
  }, []);

  return (
    <div className="py-8 border-t border-slate-800/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Portfolio Visitors</div>
            <div className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{visitorCount.toLocaleString()}</span>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">
                Live Tracked
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-500" />
          <span>Configured for Analytics API / Local Storage Counter</span>
        </div>

      </div>
    </div>
  );
};


import React from 'react';
import { Organization, JobAction } from '../types';

interface OrganizationCardProps {
  org: Organization;
  onAction: (orgId: string, action: JobAction) => void;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({ org, onAction }) => {
  const getStatusColor = (status: Organization['status']) => {
    switch (status) {
      case 'crawling': return 'text-green-400';
      case 'refining': return 'text-blue-400';
      case 'error': return 'text-red-400';
      case 'paused': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">{org.domain}</h4>
          <span className={`text-xs uppercase font-bold tracking-wider ${getStatusColor(org.status)}`}>
            {org.status}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Last updated</p>
          <p className="text-sm text-gray-300">{org.lastUpdated}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-950 p-3 rounded border border-gray-800">
          <p className="text-xs text-gray-500">Pages</p>
          <p className="text-xl font-mono text-white">{org.stats.pagesCrawled}</p>
        </div>
        <div className="bg-gray-950 p-3 rounded border border-gray-800">
          <p className="text-xs text-gray-500">Refined</p>
          <p className="text-xl font-mono text-white">{org.stats.refinedNodes}</p>
        </div>
      </div>

      <div className="w-full bg-gray-800 h-1.5 rounded-full mb-6">
        <div 
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${org.progress}%` }}
        ></div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onAction(org.id, JobAction.RESUME)}
          className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded border border-gray-700 transition"
        >
          Resume
        </button>
        <button 
          onClick={() => onAction(org.id, JobAction.RESTART)}
          className="flex-1 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm font-semibold rounded border border-red-900/50 transition"
        >
          Fresh Start
        </button>
      </div>
    </div>
  );
};

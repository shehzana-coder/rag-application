
import React, { useState } from 'react';
import { PYTHON_CRAWLER_TEMPLATE } from '../constants';

export const PythonCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PYTHON_CRAWLER_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-400">Scraping Engine Logic</h3>
        <button 
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm transition"
        >
          {copied ? 'Copied!' : 'Copy Python Code'}
        </button>
      </div>
      <div className="max-h-[500px] overflow-y-auto font-mono text-sm text-gray-300 bg-gray-950 p-4 rounded border border-gray-800">
        <pre>{PYTHON_CRAWLER_TEMPLATE}</pre>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { PythonCodeViewer } from './components/PythonCodeViewer';

const App: React.FC = () => {
  const [view, setView] = useState<'overview' | 'engine' | 'config'>('overview');

  return (
    <div className="min-h-screen bg-gray-950 flex text-gray-200 selection:bg-blue-500/30">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 border-r border-gray-800 p-8 flex flex-col fixed h-full shadow-2xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-blue-500/20">E</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">ScrapeMaster</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Hybrid RAG Engine v2.5</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-3">
          <button 
            onClick={() => setView('overview')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            System Overview
          </button>
          <button 
            onClick={() => setView('engine')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === 'engine' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            Backend Source
          </button>
          <button 
            onClick={() => setView('config')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === 'config' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            Configuration
          </button>
        </nav>

        <div className="mt-auto space-y-4">
           <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Redis VSS</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase">OpenAI Embed</span>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Ollama Mistral</span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              </div>
           </div>
           <p className="text-[10px] text-center text-gray-600">Enterprise RAG Pipeline &copy; 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="mb-12">
           <h2 className="text-4xl font-black text-white mb-2">
            {view === 'overview' ? 'Hybrid Architecture' : view === 'engine' ? 'The Python Engine' : 'Environment Config'}
           </h2>
           <p className="text-gray-400 text-lg">
            {view === 'overview' ? 'Leveraging Ollama for local refinement and OpenAI for semantic retrieval.' : 'Explore the standalone, fault-tolerant Python implementation.'}
           </p>
        </header>

        {view === 'overview' && (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-900 border border-gray-800 rounded-3xl hover:border-blue-500/50 transition">
                     <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                     </div>
                     <h4 className="text-xl font-bold mb-2">Sub-2s Retrieval</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">Redis HNSW + OpenAI Embeddings ensure the 'Retrieve' phase completes in milliseconds, allowing the LLM 'Generate' phase to fit within the 2s budget.</p>
                  </div>
                  <div className="p-6 bg-gray-900 border border-gray-800 rounded-3xl hover:border-indigo-500/50 transition">
                     <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                     </div>
                     <h4 className="text-xl font-bold mb-2">High Precision</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">OpenAI 1536-dimensional embeddings provide significantly better semantic recall than lightweight local models for complex organization data.</p>
                  </div>
               </div>

               <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Hybrid Refinement Pipeline</h3>
                    <p className="text-gray-400 mb-6 max-w-lg">We use local Ollama (Mistral) to 'scrub' navigation and ads before sending content to OpenAI. This reduces token counts by up to 70%, dramatically lowering API costs while maintaining quality.</p>
                    <div className="flex gap-4">
                       <div className="bg-gray-950 px-4 py-2 rounded-lg border border-gray-700 font-mono text-xs text-blue-400">Ollama: Refine</div>
                       <div className="bg-gray-950 px-4 py-2 rounded-lg border border-gray-700 font-mono text-xs text-indigo-400">OpenAI: Embed</div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl">
                <h4 className="text-gray-500 font-bold mb-4 uppercase text-xs tracking-widest">Stack Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex justify-between"><span>Embeddings</span><span className="text-white font-mono">OpenAI v3</span></li>
                  <li className="flex justify-between"><span>Refinement</span><span className="text-white font-mono">Ollama 0.1+</span></li>
                  <li className="flex justify-between"><span>Vector DB</span><span className="text-white font-mono">Redis 7.2+</span></li>
                  <li className="flex justify-between"><span>VSS Dim</span><span className="text-white font-mono">1536</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {view === 'engine' && (
          <div className="space-y-6">
            <PythonCodeViewer />
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Hybrid Setup</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h5 className="text-blue-400 font-bold mb-2 text-sm">OpenAI Integration</h5>
                  <p className="text-xs text-gray-500 mb-2">Requires a valid OPENAI_API_KEY environment variable. Uses 'text-embedding-3-small' for optimal speed/cost ratio.</p>
                  <code className="text-[10px] block bg-gray-950 p-3 rounded-lg border border-gray-800">export OPENAI_API_KEY='sk-...'</code>
                </div>
                <div>
                  <h5 className="text-blue-400 font-bold mb-2 text-sm">Ollama Refiner</h5>
                  <p className="text-xs text-gray-500 mb-2">Running locally on port 11434. Mistral is the recommended model for text cleaning tasks.</p>
                  <code className="text-[10px] block bg-gray-950 p-3 rounded-lg border border-gray-800">ollama run mistral</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'config' && (
          <div className="max-w-2xl bg-gray-900 p-12 rounded-[40px] border border-gray-800 mx-auto">
             <h3 className="text-3xl font-bold mb-8 text-center">Global Engine Settings</h3>
             <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 block mb-2">Embedding Provider</label>
                  <input type="text" value="OpenAI (text-embedding-3-small)" className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" disabled />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 block mb-2">VSS Dimensions</label>
                  <input type="text" value="1536 (Fixed)" className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" disabled />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 block mb-2">Refinement Engine</label>
                  <select className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none">
                    <option>Ollama Local (Mistral)</option>
                    <option>Ollama Local (Llama3)</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-xl shadow-blue-500/20">
                  Update Engine Configuration
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import SwitchToggle from "./components/SwitchToggle";
import { domainSuggestions } from "./data/domains";


export default function App() {
  const [input, setInput] = useState("");
  const [blockedSites, setBlockedSites] = useState<string[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);


  // Predefined domain suggestions
  useEffect(() => {
    chrome.storage.local.get("blockedSites", (data) => {
      setBlockedSites(data.blockedSites || []);
    });
  }, []);


  useEffect(() => {
    chrome.storage.local.get(["kufokusEnabled"], (result) => {
      setEnabled(result.kufokusEnabled ?? false);
    });
  }, []);

  // Save to storage on change
  useEffect(() => {
    chrome.storage.local.set({ kufokusEnabled: enabled });
  }, [enabled]);

  // Domain suggestions
  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = domainSuggestions
      .filter((domain) =>
        domain.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 5); // limit suggestions
    setSuggestions(matches);
  }, [input]);


  const saveSites = (newList: string[]) => {
    chrome.storage.local.set({ blockedSites: newList });
    setBlockedSites(newList);
  };

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || blockedSites.includes(trimmed)) return;
    saveSites([...blockedSites, trimmed]);
    setInput("");
  };

  const handleDelete = (domain: string) => {
    const filtered = blockedSites.filter((site) => site !== domain);
    saveSites(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };


  return (
    <div className="min-w-[400px] max-w-md mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  shadow-2xl border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="relative bg-sky-500 p-6 text-white">


        <div className="relative">
          <div className="flex items-center gap-3 mb-2">

            <h1 className="text-2xl font-bold tracking-tight">Kufokus</h1>
            <SwitchToggle
              checked={enabled}
              onChange={setEnabled}
              onColor="#60a5fa"  // blue-400
              offColor="#d1d5db" // gray-300
            />
          </div>
          <p className="text-grey-100 font-medium flex items-center">
            <span> Semangat!!!</span>
            <span className="text-lg">🫡</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Add Site Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-300">
            Block New Website
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                placeholder="e.g. instagram.com"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-600 rounded-xl max-h-40 overflow-y-auto shadow-lg">
                  {suggestions.map((domain, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setInput(domain);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-slate-700 text-white"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >

              + Add
            </button>
          </div>
        </div>

        {/* Blocked Sites List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300">Blocked Sites</h3>
            <span className="bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-full">
              {blockedSites.length} sites
            </span>
          </div>

          {blockedSites.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              {/* <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" /> */}
              <p className="text-sm">No blocked sites yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
              {blockedSites.map((site, idx) => (
                <div
                  key={idx}
                  className="group flex justify-between items-center bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 rounded-lg p-3 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-slate-200 font-medium">{site}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(site)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all duration-200"
                  >
                    X
                    {/* <X className="w-4 h-4" /> */}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


    </div>

  );
}

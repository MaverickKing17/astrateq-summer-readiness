import React from "react";
import { ShieldCheck, Sparkles, Car } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (to: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          id="header-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-300 shadow-md border border-white/20 p-1 shrink-0">
            <img 
              src="https://i.ibb.co/ynbBZ29w/Chat-GPT-Image-Jun-9-2026-07-07-30-PM.png" 
              alt="Astrateq Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-display font-black text-lg leading-tight tracking-tight text-slate-950 flex items-center gap-1.5">
              Astrateq <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/10 font-mono font-bold text-slate-900 border border-slate-950/10">Pre-launch</span>
            </h1>
          </div>
        </button>

        {/* Navigation / Pilot Action */}
        <div className="flex items-center gap-3">
          {currentPath === "/" ? (
            <button
              onClick={() => onNavigate("/summer-readiness")}
              className="relative overflow-hidden px-4 py-2 text-xs sm:text-sm font-display font-black rounded-full bg-slate-950 text-white hover:bg-slate-900 transition-all duration-300 cursor-pointer shadow-md group"
              id="header-cta-btn"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Readiness Check
              </span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate("/")}
              className="px-4 py-2 text-xs sm:text-sm font-display font-bold rounded-full text-slate-950 hover:bg-white bg-white/40 hover:bg-white border border-slate-950/10 transition-all duration-300 cursor-pointer"
              id="header-back-home"
            >
              Learn About Astrateq
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

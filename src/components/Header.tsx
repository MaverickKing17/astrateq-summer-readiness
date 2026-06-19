import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (to: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          id="header-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-300 shadow-sm border border-slate-200/80">
            <img 
              src="https://i.imgur.com/sIGZgGz.png" 
              alt="Astrateq Gadgets Logo" 
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight tracking-tight text-slate-900 flex items-center gap-1.5">
              Astrateq Gadgets <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 font-sans font-medium text-slate-600 border border-slate-200">Pre-launch</span>
            </h1>
            <p className="text-xs font-mono text-slate-500 tracking-wider">DRIVE SAFER. DRIVE SMARTER.</p>
          </div>
        </button>

        {/* Navigation / Pilot Action */}
        <div className="flex items-center gap-3">
          {currentPath === "/" ? (
            <button
              onClick={() => onNavigate("/summer-readiness")}
              className="relative overflow-hidden px-4 py-2 text-xs sm:text-sm font-display font-medium rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-sm group"
              id="header-cta-btn"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan-light animate-pulse" />
                Readiness Check
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          ) : (
            <button
              onClick={() => onNavigate("/")}
              className="px-4 py-2 text-xs sm:text-sm font-display font-medium rounded-full text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all duration-300 cursor-pointer"
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

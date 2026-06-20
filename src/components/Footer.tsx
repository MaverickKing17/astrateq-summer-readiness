import React from "react";
import { Instagram, Linkedin, ShieldCheck, MapPin, Cpu, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onNavigate: (to: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-slate-950 text-slate-400 py-16 mt-auto overflow-hidden">
      
      {/* 1. Technical Top Border Gradient to split from body */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      {/* 2. Ambient subtle background point light */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[150px] rounded-full bg-cyan-950/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Brand & Narrative (5 cols) */}
          <div className="md:col-span-5 space-y-5 text-left">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-black text-white text-2xl tracking-tighter hover:text-cyan-400 transition-colors duration-300">
                Astrateq Gadgets<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[9px] font-mono font-black text-cyan-400 bg-cyan-950/40 border border-cyan-800/20 px-2 py-0.5 rounded-md uppercase tracking-widest">
                PRE-LAUNCH
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-white max-w-sm leading-relaxed font-bold">
              A pre-launch Canadian automotive technology brand exploring privacy-first vehicle intelligence, driver awareness, and real-time localized diagnostics across cold thermal parameters.
            </p>

            {/* Micro telemetry tag */}
            <div className="flex items-center gap-3 pt-2 text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>DRIVE SAFER • SECURE COHERENCE</span>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h3 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2">
              Pre-Launch Navigator
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate("/")}
                  className="group flex items-center gap-1 hover:text-cyan-400 transition-all duration-300 cursor-pointer font-sans font-bold text-white hover:translate-x-1"
                >
                  <span>Brand Gateway</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/summer-readiness")}
                  className="group flex items-center gap-1 hover:text-cyan-400 transition-all duration-300 cursor-pointer font-sans font-bold text-white hover:translate-x-1"
                >
                  <span>Driver Readiness Check</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100" />
                </button>
              </li>
              <li>
                <a
                  href="https://reserve.astrateqgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 hover:text-cyan-400 transition-all duration-300 font-sans font-bold text-white hover:translate-x-1"
                >
                  <span>Founding Cohort</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Location, Trust, & Social Channels (4 cols) */}
          <div className="md:col-span-4 space-y-5 text-left">
            <h3 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2">
              Security & Social Verification
            </h3>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/astrateq24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-white hover:text-pink-400 hover:border-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] shrink-0"
                title="Instagram"
              >
                <Instagram className="w-5.5 h-5.5" />
              </a>
              <a
                href="https://x.com/AstrateqIQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-white hover:text-cyan-450 hover:border-cyan-450 transition-all duration-300 font-sans font-black text-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0"
                title="X (Twitter)"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com/company/astrateq-gadgets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0"
                title="LinkedIn"
              >
                <Linkedin className="w-5.5 h-5.5" />
              </a>
            </div>

            {/* Context Location Info Box */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Geographical Context</span>
              </div>
              <p className="text-[11px] text-white font-bold leading-relaxed">
                Calibrated strictly for Toronto, GTA & broader Canadian driving environments. All analytical and telemetry pipelines are insulated server-side.
              </p>
            </div>

          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-900 mt-12 mb-8"></div>

        {/* Closing details / Legal Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4 font-mono font-semibold">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Astrateq Gadgets. Built & registered under Canada pre-launch initiatives.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-850/60 font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Secure System Validation • Sandbox Preview</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

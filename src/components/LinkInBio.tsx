import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Compass, Gauge, Cpu, Check, Instagram, Twitter, Linkedin, Car } from "lucide-react";

interface LinkInBioProps {
  onNavigate: (to: string) => void;
}

export default function LinkInBio({ onNavigate }: LinkInBioProps) {
  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col justify-between py-12 px-4 sm:px-6 relative overflow-hidden selection:bg-slate-100 selection:text-slate-950">
      {/* Dynamic glowing background blobs for automotive radar HUD effect */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-white/25 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms]"></div>
      
      {/* Immersive technology mesh backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Profile Header */}
        <div className="text-center space-y-5">
          <div className="relative inline-flex filter drop-shadow-[0_4px_12px_rgba(15,29,36,0.15)] select-none group">
            {/* Glowing neon border pulse */}
            <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-white via-slate-100 to-white/70 blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            {/* Dark core emblem container */}
            <div className="relative w-20 h-20 rounded-[22px] bg-white border border-white/20 flex items-center justify-center text-slate-950 shadow-2xl overflow-hidden p-2">
              <img 
                src="https://i.ibb.co/ynbBZ29w/Chat-GPT-Image-Jun-9-2026-07-07-30-PM.png" 
                alt="Astrateq Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* High-tech flashing active status circle */}
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-slate-950 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="font-display font-black text-4xl text-slate-950 tracking-tight">
              Astrateq Gadgets
            </h1>
            <p className="text-xs font-mono text-slate-900 tracking-widest uppercase font-black">
              Drive Safer. Drive Smarter.
            </p>
          </div>
          <p className="text-sm sm:text-base text-slate-800 max-w-lg mx-auto leading-relaxed font-sans font-semibold">
            A pre-launch Canadian automotive technology brand exploring privacy-first vehicle intelligence, driver awareness, and smarter diagnostics.
          </p>
        </div>

        {/* Featured Interactive Campaign Link (The Lead Magnet Page) */}
        <button
          onClick={() => onNavigate("/summer-readiness")}
          className="w-full text-left bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300 relative overflow-hidden group cursor-pointer block border border-slate-900"
          id="cta-summer-readiness"
        >
          {/* Subtle cyan background gradient glow */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

          <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Featured Assessment
              </span>
              <span className="font-mono text-xs text-white/90 font-bold tracking-wider bg-white/10 px-2 py-0.5 rounded-lg border border-white/15">60s Check</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Vehicle Intelligence Readiness Check:<br className="hidden sm:inline" /> Summer Edition
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Preparing for cottage drives, long highway runs, or weekend cottage trips? Complete the short assessment to see how your driving habits and privacy goals align.
              </p>
            </div>

            <div className="flex items-center gap-2 text-cyan-400 font-display font-black text-sm pt-2 group-hover:translate-x-1.5 transition-all duration-300">
              <span className="border-b border-cyan-400/30 group-hover:border-cyan-400 transition-colors pb-0.5">Start My Summer Readiness Check</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </button>

        {/* Brand Pillars Quick Grid */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-900 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-850 pb-3">
            <h3 className="font-display font-black text-xs tracking-widest uppercase text-white">
              What is Astrateq Exploring?
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-black text-white uppercase tracking-wider">
              Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Contextual Diagnostics */}
            <div className="group flex gap-4 items-start p-4 bg-slate-900 border border-slate-800/80 hover:border-orange-500/40 hover:bg-slate-900/40 rounded-2xl transition-all duration-300 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 border border-orange-500/20">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-orange-400 block uppercase tracking-wider leading-none">Diagnostic</span>
                <h4 className="font-display font-black text-white text-sm leading-tight">Contextual Diagnostics</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed font-semibold">Explanations for warning symbols instead of obscure technical codes.</p>
              </div>
            </div>

            {/* Card 2: Privacy-First Design */}
            <div className="group flex gap-4 items-start p-4 bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/40 rounded-2xl transition-all duration-300 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-emerald-400 block uppercase tracking-wider leading-none">Custody</span>
                <h4 className="font-display font-black text-white text-sm leading-tight">Privacy-First Design</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed font-semibold">Your vehicle records reside directly under your own encrypted custody.</p>
              </div>
            </div>

            {/* Card 3: Driver Awareness */}
            <div className="group flex gap-4 items-start p-4 bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/40 rounded-2xl transition-all duration-300 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 border border-cyan-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-cyan-400 block uppercase tracking-wider leading-none">Telemetry</span>
                <h4 className="font-display font-black text-white text-sm leading-tight">Driver Awareness</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed font-semibold">Real-time fatigue and focal coaching for long road trips.</p>
              </div>
            </div>

            {/* Card 4: Hardware Verification */}
            <div className="group flex gap-4 items-start p-4 bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900/40 rounded-2xl transition-all duration-300 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-purple-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 border border-purple-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-purple-400 block uppercase tracking-wider leading-none">Integration</span>
                <h4 className="font-display font-black text-white text-sm leading-tight">Hardware Verification</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed font-semibold">OEM-neutral plug-and-verify diagnostics validation logic.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Social and Communication Hub */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-900 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-850 pb-3">
            <h3 className="font-display font-black text-xs tracking-widest uppercase text-white">
              Connect & Follow Progress
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-450 animate-pulse"></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <a
              href="https://instagram.com/astrateq24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-pink-500/40 hover:bg-slate-900/40 text-white transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-xs"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform duration-300 border border-pink-500/20">
                  <Instagram className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block tracking-wide group-hover:text-pink-400 transition-colors">@astrateq24</span>
                <span className="text-sm font-display font-black text-white">Instagram</span>
              </div>
            </a>

            <a
              href="https://x.com/AstrateqIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-500/40 hover:bg-slate-900/40 text-white transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-xs"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <span className="text-sm font-bold block leading-none w-5 h-5 flex items-center justify-center">𝕏</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block tracking-wide group-hover:text-white transition-colors">@AstrateqIQ</span>
                <span className="text-sm font-display font-black text-white">Twitter</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/company/astrateq-gadgets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/40 text-white transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-xs"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                  <Linkedin className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block tracking-wide group-hover:text-blue-400 transition-colors">Astrateq Gadgets</span>
                <span className="text-sm font-display font-black text-white">LinkedIn</span>
              </div>
            </a>

          </div>
        </div>

        {/* Bottom Pre-Launch Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-900 select-none pb-4 font-bold">
          <ShieldCheck className="w-4.5 h-4.5 text-slate-900 animate-pulse" />
          <span>Privacy-First Market Validation Funnel</span>
        </div>

      </div>
    </div>
  );
}

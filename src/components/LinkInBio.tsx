import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Compass, Gauge, Cpu, Check, Instagram, Twitter, Linkedin } from "lucide-react";

interface LinkInBioProps {
  onNavigate: (to: string) => void;
}

export default function LinkInBio({ onNavigate }: LinkInBioProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 items-center justify-center text-brand-cyan shadow-md">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
              Astrateq Gadgets
            </h1>
            <p className="text-sm font-mono text-slate-500 tracking-widest uppercase">
              Drive Safer. Drive Smarter.
            </p>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            A pre-launch Canadian automotive technology brand exploring privacy-first vehicle intelligence, driver awareness, and smarter diagnostics.
          </p>
        </div>

        {/* Featured Interactive Campaign Link (The Lead Magnet Page) */}
        <button
          onClick={() => onNavigate("/summer-readiness")}
          className="w-full text-left bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer block border border-slate-800"
          id="cta-summer-readiness"
        >
          {/* Subtle cyan background gradient glow */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-brand-cyan/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl opacity-50"></div>

          <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                Featured Assessment
              </span>
              <span className="font-mono text-xs text-white/90 font-bold tracking-wider bg-white/10 px-2 py-0.5 rounded-lg border border-white/15">60s Check</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Vehicle Intelligence Readiness Check:<br className="hidden sm:inline" /> Summer Edition
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Preparing for cottage drives, long highway runs, or weekend cottage trips? Complete the short assessment to see how your driving habits and privacy goals align.
              </p>
            </div>

            <div className="flex items-center gap-2 text-white font-display font-bold text-sm pt-2 group-hover:translate-x-1.5 transition-all duration-300">
              <span className="border-b border-white/30 group-hover:border-white transition-colors pb-0.5">Start My Summer Readiness Check</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </button>

        {/* Brand Pillars Quick Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-black text-xs tracking-widest uppercase text-slate-400">
              What is Astrateq Exploring?
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200/60 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Contextual Diagnostics */}
            <div className="group flex gap-4 items-start p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-150 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-orange-600 block uppercase tracking-wider leading-none">Diagnostic</span>
                <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">Contextual Diagnostics</h4>
                <p className="text-xs text-slate-500 font-sans font-medium leading-relaxed">Explanations for warning symbols instead of obscure technical codes.</p>
              </div>
            </div>

            {/* Card 2: Privacy-First Design */}
            <div className="group flex gap-4 items-start p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-150 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/[0.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-emerald-600 block uppercase tracking-wider leading-none">Custody</span>
                <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">Privacy-First Design</h4>
                <p className="text-xs text-slate-500 font-sans font-medium leading-relaxed">Your vehicle records reside directly under your own encrypted custody.</p>
              </div>
            </div>

            {/* Card 3: Driver Awareness */}
            <div className="group flex gap-4 items-start p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-150 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/[0.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-indigo-600 block uppercase tracking-wider leading-none">Telemetry</span>
                <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">Driver Awareness</h4>
                <p className="text-xs text-slate-500 font-sans font-medium leading-relaxed">Real-time fatigue and focal coaching for long road trips.</p>
              </div>
            </div>

            {/* Card 4: Hardware Verification */}
            <div className="group flex gap-4 items-start p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-150 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/[0.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-purple-500 rounded-l-2xl"></div>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-purple-600 block uppercase tracking-wider leading-none">Integration</span>
                <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">Hardware Verification</h4>
                <p className="text-xs text-slate-500 font-sans font-medium leading-relaxed">OEM-neutral plug-and-verify diagnostics validation logic.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Social and Communication Hub */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-black text-xs tracking-widest uppercase text-slate-400">
              Connect & Follow Progress
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <a
              href="https://instagram.com/astrateq24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-150 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-500/[0.03] hover:-translate-y-1 text-slate-700 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-pink-50 text-pink-500 group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block tracking-wide group-hover:text-pink-600 transition-colors">@astrateq24</span>
                <span className="text-sm font-display font-black text-slate-800">Instagram</span>
              </div>
            </a>

            <a
              href="https://x.com/AstrateqIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-150 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.03] hover:-translate-y-1 text-slate-700 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-slate-900 text-white group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold block leading-none w-5 h-5 flex items-center justify-center">𝕏</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block tracking-wide group-hover:text-slate-700 transition-colors">@AstrateqIQ</span>
                <span className="text-sm font-display font-black text-slate-800">Twitter</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/company/astrateq-gadgets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-150 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/[0.03] hover:-translate-y-1 text-slate-700 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block tracking-wide group-hover:text-blue-600 transition-colors">Astrateq Gadgets</span>
                <span className="text-sm font-display font-black text-slate-800">LinkedIn</span>
              </div>
            </a>

          </div>
        </div>

        {/* Bottom Pre-Launch Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 select-none">
          <ShieldCheck className="w-4.5 h-4.5 text-brand-cyan" />
          <span>Privacy-First Market Validation Funnel</span>
        </div>

      </div>
    </div>
  );
}

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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan-light text-xs font-mono font-semibold tracking-wider uppercase border border-brand-cyan/20">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Assessment
              </span>
              <span className="font-mono text-xs text-brand-cyan-light">60s Check</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Vehicle Intelligence Readiness Check:<br className="hidden sm:inline" /> Summer Edition
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Preparing for cottage drives, long highway runs, or weekend cottage trips? Complete the short assessment to see how your driving habits and privacy goals align.
              </p>
            </div>

            <div className="flex items-center gap-2 text-brand-cyan-light font-display font-medium text-sm pt-2 group-hover:translate-x-1 transition-transform duration-300">
              <span>Start My Summer Readiness Check</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* Brand Pillars Quick Grid */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
          <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-slate-400">
            What is Astrateq Exploring?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="flex gap-3.5 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-semibold text-slate-900 text-sm">Contextual Diagnostics</h4>
                <p className="text-xs text-slate-500">Explanations for warning symbols instead of technical jargon.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="p-2.5 rounded-xl bg-cyan-50 text-brand-cyan">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-semibold text-slate-900 text-sm">Privacy-First Design</h4>
                <p className="text-xs text-slate-500">Your vehicle records reside directly under your own custody.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-semibold text-slate-900 text-sm">Driver Awareness</h4>
                <p className="text-xs text-slate-500">Real-time awareness coaching for long Canadian highways.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-semibold text-slate-900 text-sm">Hardware Verification</h4>
                <p className="text-xs text-slate-500">OEM-neutral plug-and-verify diagnostics framework.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Social and Communication Hub */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-slate-400">
            Connect & Follow Progress
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <a
              href="https://instagram.com/astrateq24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4.5 h-4.5 text-pink-500" />
                <span className="text-sm font-semibold text-slate-800">Instagram</span>
              </div>
              <span className="text-xs text-slate-400 group-hover:translate-x-1 duration-200">@astrateq24</span>
            </a>

            <a
              href="https://x.com/AstrateqIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-slate-900">𝕏</span>
                <span className="text-sm font-semibold text-slate-800">Twitter</span>
              </div>
              <span className="text-xs text-slate-400 group-hover:translate-x-1 duration-200">@AstrateqIQ</span>
            </a>

            <a
              href="https://linkedin.com/company/astrateq-gadgets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4.5 h-4.5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-800">LinkedIn</span>
              </div>
              <span className="text-xs text-slate-400 group-hover:translate-x-1 duration-200">Astrateq</span>
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

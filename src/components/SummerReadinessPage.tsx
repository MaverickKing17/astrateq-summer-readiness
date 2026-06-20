import React from "react";
import ValueStrip from "./ValueStrip";
import WhyMatters from "./WhyMatters";
import Assessment from "./Assessment";
import TrustPrivacy from "./TrustPrivacy";
import LiveReadinessCard from "./LiveReadinessCard";
import { Sparkles, Play, Shield, Globe, ArrowDown, ChevronRight, Gauge, Cpu } from "lucide-react";

export default function SummerReadinessPage() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="animate-fade-in relative min-h-screen bg-[#f4f6f8] text-slate-900 overflow-hidden divide-y divide-slate-200/30">
      
      {/* Premium Layered Editorial Background System */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base neutral cool grey-pearl background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f7f9] via-[#edf2f6] to-[#f4f6f8]" />
        
        {/* Subtle radial gradients mapping summer driving warmth and sky clarity */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(56,189,248,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,rgba(99,102,241,0.08),transparent_50%)]" />
        
        {/* The premium generated image layer simulating highway perspective & long drives */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-[0.09]"
          style={{ backgroundImage: `url('/src/assets/images/summer_highway_1781983457956.jpg')` }}
        />

        {/* Soft vignette matching regional highway atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(244,246,248,0.35)_100%)]" />
        
        {/* Abstract road mapping system overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_65%,transparent_100%)]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-transparent text-slate-950 py-16 sm:py-24 lg:py-28 px-4 border-b border-slate-200/40" id="hero-section">
        
        {/* Luminous accents echoing the glossy reflections of high-end automotive design */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.35),transparent_50%)]"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8 text-left">
            
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-mono font-black tracking-wider uppercase border border-slate-900 shadow-lg animate-pulse animate-duration-1000">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              CANADA Summer 2026 ACTIVE
            </span>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-none">
              Vehicle Intelligence<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-800">
                Readiness Check
              </span>
            </h1>

            {/* Subheadline & Description */}
            <div className="space-y-4 max-w-xl">
              <p className="text-lg sm:text-2xl text-slate-900 font-sans font-extrabold leading-tight">
                "Your summer driving profile will be analyzed in under 60 seconds."
              </p>
              <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed border-l-2 border-slate-950/40 pl-4 font-semibold">
                This is a behavioral diagnostic and cohort validation system designed to evaluate regional driving and data privacy compatibility parameters in Canada.
              </p>
            </div>

            {/* Primary CTA ONLY -- Removed secondary competing CTA as requested */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <button
                onClick={() => handleScrollTo("assessment-section")}
                className="px-8 py-5 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-display font-black text-base tracking-wide flex items-center justify-center gap-2.5 shadow-2xl transition-all duration-300 transform active:scale-98 cursor-pointer hover:scale-[1.01]"
                id="hero-primary-cta"
              >
                <span>Start Summer Readiness Check</span>
                <ChevronRight className="w-4.5 h-4.5 text-cyan-400" />
              </button>
            </div>

          </div>

          {/* Right Hero Column: Live Readiness Preview Card */}
          <div className="lg:col-span-5 flex justify-center relative w-full">
            
            {/* Glowing cyan circular background intelligence lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-cyan-500/10 animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 rounded-full border border-dashed border-cyan-500/5 animate-[spin_25s_linear_infinite] pointer-events-none"></div>
            
            <LiveReadinessCard />

          </div>

        </div>

        {/* Small subtle scroll reminder */}
        <div className="flex justify-center pt-8 sm:pt-12 relative z-10">
          <button
            onClick={() => handleScrollTo("why-it-matters")}
            className="p-2 bg-slate-950 border border-slate-900 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Scroll Down"
          >
            <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          </button>
        </div>

      </section>

      {/* 2. VALUE STRIP */}
      <ValueStrip />

      {/* 3. WHY THIS MATTERS SECTION */}
      <WhyMatters />

      {/* 4. INTERACTIVE READINESS CHECK (Assessment widget) */}
      <Assessment />

      {/* 8 & 9. TRUST & PRIVACY SECTION */}
      <TrustPrivacy />

      {/* 10. FINAL CTA SECTION - Deepens toward a dark, refined, atmospheric cool tone to complete checkup cleanly */}
      <section className="bg-slate-950 text-white py-20 sm:py-28 relative overflow-hidden border-t border-slate-900" id="final-cta">
        {/* Soft light glows framing footer border transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_60%)]"></div>
        
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
              Ready to see where your vehicle stands?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Complete the 60-second summer readiness check and see whether your driving profile aligns with Astrateq’s pre-launch validation program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-stretch sm:items-center max-w-md mx-auto pt-2">
            <button
              onClick={() => handleScrollTo("assessment-section")}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-display font-black text-sm sm:text-base rounded-2xl tracking-wide transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.01]"
              id="final-cta-start"
            >
              Start My Summer Readiness Check
            </button>
            
            <a
              href="https://reserve.astrateqgadgets.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-slate-900 hover:bg-slate-850 text-white font-display font-extrabold text-sm sm:text-base rounded-2xl tracking-wide transition-all duration-300 text-center border border-slate-800 shadow-sm"
            >
              Join Founding Driver Cohort
            </a>
          </div>

          <div className="pt-6 text-xs text-slate-400 font-mono font-bold flex items-center justify-center gap-1.5 select-none">
            <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>CANADA 2026 PRE-LAUNCH INITIATIVE</span>
          </div>

        </div>
      </section>

    </div>
  );
}

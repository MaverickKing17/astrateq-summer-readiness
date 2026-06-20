import React from "react";
import ValueStrip from "./ValueStrip";
import WhyMatters from "./WhyMatters";
import Assessment from "./Assessment";
import TrustPrivacy from "./TrustPrivacy";
import { Sparkles, Play, Shield, Globe, ArrowDown, ChevronRight, Gauge, Cpu } from "lucide-react";

export default function SummerReadinessPage() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="animate-fade-in divide-y divide-slate-100 bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white text-slate-950 py-16 sm:py-24 lg:py-28 px-4 border-b border-slate-200">
        
        {/* Luminous accents echoing the glossy reflections of the car photo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        
        {/* Subtle decorative grid overlay simulating state-of-the-art vehicle systems */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

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

          {/* Right Hero Image Column (Automotive Editorial) */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Glowing cyan circular background intelligence lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-white/30 animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 rounded-full border border-dashed border-white/20 animate-[spin_25s_linear_infinite] pointer-events-none"></div>
            
            {/* Outer shadow card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white bg-white/95 aspect-square w-full max-w-sm group flex flex-col items-center justify-center p-6 sm:p-8">
              
              <img
                src="https://i.ibb.co/ynbBZ29w/Chat-GPT-Image-Jun-9-2026-07-07-30-PM.png"
                alt="Astrateq Logo Detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Live HUD feedback tags simulating subtle OEM-neutral vehicle telemetry details */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2 font-mono text-[10px] tracking-wide text-slate-900 bg-white/95 px-2.5 py-1.5 rounded-lg border border-slate-200/50 select-none shadow-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping mt-0.5" />
                <span>INTELLIGENCE VERIFICATION</span>
              </div>

              <div className="absolute top-4 right-4 z-20 font-mono text-[9px] text-slate-600 bg-white/90 px-2 py-1 rounded-md border border-slate-200/50 shadow-sm font-bold">
                GTA REGION OK
              </div>

            </div>

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

      {/* 10. FINAL CTA SECTION */}
      <section className="bg-white text-slate-950 py-16 sm:py-20 relative overflow-hidden border-t border-slate-200" id="final-cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_60%)]"></div>
        
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-tight">
              Ready to see where your vehicle stands?
            </h3>
            <p className="text-slate-900 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-bold">
              Complete the 60-second summer readiness check and see whether your driving profile aligns with Astrateq’s pre-launch validation program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-stretch sm:items-center max-w-md mx-auto pt-2">
            <button
              onClick={() => handleScrollTo("assessment-section")}
              className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-display font-black text-sm sm:text-base rounded-2xl tracking-wide transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.01]"
              id="final-cta-start"
            >
              Start My Summer Readiness Check
            </button>
            
            <a
              href="https://reserve.astrateqgadgets.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-white/60 hover:bg-white text-slate-950 font-display font-extrabold text-sm sm:text-base rounded-2xl tracking-wide transition-all duration-300 text-center border border-slate-950/10 shadow-sm"
            >
              Join Founding Driver Cohort
            </a>
          </div>

          <div className="pt-6 text-xs text-slate-900 font-mono font-bold flex items-center justify-center gap-1.5 select-none">
            <Shield className="w-4 h-4 text-slate-900 animate-pulse" />
            <span>CANADA 2026 PRE-LAUNCH INITIATIVE</span>
          </div>

        </div>
      </section>

    </div>
  );
}

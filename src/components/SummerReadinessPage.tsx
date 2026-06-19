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
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 lg:py-28 px-4 border-b border-slate-900">
        
        {/* Deep ambient dark gradients reflecting a high-quality futuristic feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.14),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8 text-left">
            
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan-light text-xs font-mono font-bold tracking-wider uppercase border border-brand-cyan/25 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Summer 2026 GTA Driver Readiness
            </span>

            {/* Headline */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              Vehicle Intelligence Readiness Check:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-light via-brand-cyan to-indigo-400">
                Summer Edition
              </span>
            </h2>

            {/* Subheadline & Description */}
            <div className="space-y-4 max-w-xl">
              <p className="text-lg sm:text-xl text-slate-200 font-sans font-medium leading-relaxed">
                See how your vehicle, driving habits, and privacy expectations align with Astrateq’s pre-launch validation program for smarter summer driving.
              </p>
              <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed border-l-2 border-brand-cyan/40 pl-4">
                Built for Toronto/GTA drivers preparing for highway trips, cottage drives, family travel, and warmer-weather vehicle strain.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <button
                onClick={() => handleScrollTo("assessment-section")}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-display font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
                id="hero-primary-cta"
              >
                <span>Start My Summer Readiness Check</span>
                <ChevronRight className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => handleScrollTo("why-it-matters")}
                className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-display font-bold text-sm sm:text-base tracking-wide hover:text-white transition-all duration-300 cursor-pointer border border-slate-800"
                id="hero-secondary-cta"
              >
                Learn About Astrateq
              </button>
            </div>

          </div>

          {/* Right Hero Image Column (Automotive Editorial) */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Glowing cyan circular background intelligence lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-brand-cyan/20 animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 rounded-full border border-dashed border-indigo-500/10 animate-[spin_25s_linear_infinite] pointer-events-none"></div>
            
            {/* Outer shadow card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/90 aspect-video w-full max-w-md group">
              
              {/* Telemetry frame simulation overlay to resemble screenshot */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10"></div>
              
              <img
                src="/src/assets/images/suv_crossover_hero_1781899458154.jpg"
                alt="Astrateq OEM-neutral Crossover SUV on road"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Live HUD feedback tags simulating subtle OEM-neutral vehicle telemetry details */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2 font-mono text-[10px] tracking-wide text-brand-cyan bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-brand-cyan/20 select-none">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping mt-0.5" />
                <span>INTELLIGENCE VERIFICATION</span>
              </div>

              <div className="absolute top-4 right-4 z-20 font-mono text-[9px] text-slate-400 bg-slate-950/60 px-2 py-1 rounded-md">
                GTA REGION OK
              </div>

            </div>

          </div>

        </div>

        {/* Small subtle scroll reminder */}
        <div className="flex justify-center pt-8 sm:pt-12 relative z-10">
          <button
            onClick={() => handleScrollTo("why-it-matters")}
            className="p-2 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Scroll Down"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
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
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden" id="final-cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08),transparent_60%)]"></div>
        
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
              Ready to see where your vehicle stands?
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Complete the 60-second summer readiness check and see whether your driving profile aligns with Astrateq’s pre-launch validation program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-stretch sm:items-center max-w-md mx-auto pt-2">
            <button
              onClick={() => handleScrollTo("assessment-section")}
              className="px-8 py-4 bg-brand-cyan hover:bg-brand-cyan-light text-slate-950 font-display font-extrabold text-sm sm:text-base rounded-2xl tracking-wide transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.01]"
              id="final-cta-start"
            >
              Start My Summer Readiness Check
            </button>
            
            <a
              href="https://reserve.astrateqgadgets.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-display font-bold text-sm sm:text-base rounded-2xl tracking-wide transition-all duration-300 text-center border border-slate-800"
            >
              Join Founding Driver Cohort
            </a>
          </div>

          <div className="pt-6 text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5 select-none">
            <Shield className="w-4 h-4 text-brand-cyan/60" />
            <span>CANADA 2026 PRE-LAUNCH INITIATIVE</span>
          </div>

        </div>
      </section>

    </div>
  );
}

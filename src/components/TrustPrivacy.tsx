import React from "react";
import { CheckCircle, ShieldCheck, HeartHandshake, EyeOff, MailCheck, UserCheck, Lock, ShieldAlert } from "lucide-react";

export default function TrustPrivacy() {
  const trustBullets = [
    "No purchase required",
    "No payment collected on this page",
    "Hardware is not currently shipping",
    "Results are used to understand demand and compatibility interest",
    "Early participants may be invited toward founding cohort reservation",
  ];

  const privacyBullets = [
    "No third-party resale of submitted readiness answers",
    "Email used for readiness result and optional updates",
    "User-controlled early-access interest",
    "Built around data minimization principles",
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100" id="trust-privacy-section">
      <div className="max-w-4xl mx-auto px-4 space-y-12 sm:space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          
          {/* Trust Panel */}
          <div className="group bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden">
            {/* Top glowing banner */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                  PRE-LAUNCH TRUST GUARANTEE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[9px] font-bold border border-indigo-500/20">
                  Zero Obligation
                </span>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-xs border border-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="font-display font-black text-2xl text-white tracking-tight leading-tight">
                  Built for pre-launch validation, not hype.
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  Astrateq Gadgets is currently validating market demand, driver interest, and vehicle compatibility signals before committing to broader hardware manufacturing. This readiness check helps us understand what Canadian drivers actually need from privacy-first vehicle intelligence.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-900 pt-6">
              <ul className="space-y-3.5">
                {trustBullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-300 font-sans font-medium">
                    <span className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-300">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Privacy Panel */}
          <div className="group bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden">
            {/* Top glowing banner */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500"></div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                  DATA ESCROW PROTECTION
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[9px] font-bold border border-cyan-500/20">
                  GDPR Aligned
                </span>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-xs border border-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-display font-black text-2xl text-white tracking-tight leading-tight">
                  Privacy-first by design.
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  Astrateq is exploring vehicle intelligence that helps drivers understand their vehicles without unnecessary data exposure. Your submissions never leave local boundaries except of secure aggregate telemetry research.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-900 pt-6">
              <ul className="space-y-3.5">
                {privacyBullets.map((bullet, idx) => {
                  // Setup custom icons for privacy to add depth
                  let icon = <Lock className="w-4 h-4 text-cyan-400" />;
                  if (idx === 0) icon = <EyeOff className="w-4 h-4 text-cyan-400" />;
                  if (idx === 1) icon = <MailCheck className="w-4 h-4 text-cyan-400" />;
                  if (idx === 2) icon = <UserCheck className="w-4 h-4 text-cyan-400" />;
                  
                  return (
                    <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-300 font-sans font-medium">
                      <span className="w-5 h-5 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/10">
                        {icon}
                      </span>
                      <span className="text-slate-300">{bullet}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

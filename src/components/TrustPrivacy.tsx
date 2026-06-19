import React from "react";
import { CheckCircle, ShieldCheck, HeartHandshake, EyeOff, MailCheck, UserCheck, Lock } from "lucide-react";

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          
          {/* Trust Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                Built for pre-launch validation, not hype.
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                Astrateq Gadgets is currently validating market demand, driver interest, and vehicle compatibility signals before committing to broader hardware manufacturing. This readiness check helps us understand what Canadian drivers actually need from privacy-first vehicle intelligence.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <ul className="space-y-3">
                {trustBullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                    <CheckCircle className="w-4.5 h-4.5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Privacy Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-brand-cyan shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                Privacy-first by design.
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                Astrateq is exploring vehicle intelligence that helps drivers understand their vehicles without unnecessary data exposure.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <ul className="space-y-3">
                {privacyBullets.map((bullet, idx) => {
                  // Setup custom icons for privacy to add depth
                  let icon = <Lock className="w-4.5 h-4.5 text-brand-cyan mt-0.5 flex-shrink-0" />;
                  if (idx === 0) icon = <EyeOff className="w-4.5 h-4.5 text-brand-cyan mt-0.5 flex-shrink-0" />;
                  if (idx === 1) icon = <MailCheck className="w-4.5 h-4.5 text-brand-cyan mt-0.5 flex-shrink-0" />;
                  if (idx === 2) icon = <UserCheck className="w-4.5 h-4.5 text-brand-cyan mt-0.5 flex-shrink-0" />;
                  
                  return (
                    <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                      {icon}
                      <span>{bullet}</span>
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

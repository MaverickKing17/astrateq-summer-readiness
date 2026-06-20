import React from "react";
import { Navigation, AlertTriangle, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function WhyMatters() {
  const cards = [
    {
      id: "longer-drives",
      title: "Longer Drives",
      tag: "BATTERY & ROTATION",
      description: "Cottage trips, highway routes, and weekend travel increase the need for better vehicle awareness.",
      icon: <Navigation className="w-5 h-5 text-slate-900" />,
      accentColor: "bg-slate-950",
      iconBg: "bg-slate-50 text-slate-900 border-slate-200",
    },
    {
      id: "vehicle-signals",
      title: "Vehicle Signals",
      tag: "DIAGNOSTIC TELEMETRY",
      description: "Warning lights and diagnostics often lack context when drivers need clarity most.",
      icon: <AlertTriangle className="w-5 h-5 text-slate-900" />,
      accentColor: "bg-slate-950",
      iconBg: "bg-slate-50 text-slate-900 border-slate-200",
    },
    {
      id: "data-privacy",
      title: "Data Privacy",
      tag: "ZERO-CLOUD CUSTODY",
      description: "Smarter vehicle technology should not require drivers to surrender control of their data.",
      icon: <ShieldCheck className="w-5 h-5 text-slate-900" />,
      accentColor: "bg-slate-950",
      iconBg: "bg-slate-50 text-slate-900 border-slate-200",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 relative overflow-hidden" id="why-it-matters">
      {/* Background soft light blobs for elegant canvas framing */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-mono font-bold tracking-widest uppercase border border-slate-900 shadow-sm leading-none">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Why This Matters
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 tracking-tight leading-tight">
            Summer driving creates <br className="hidden sm:inline" />different vehicle signals.
          </h2>
          <p className="text-slate-700 font-sans text-sm sm:text-base leading-relaxed font-semibold">
            Longer routes, heat, traffic, tire pressure changes, and dashboard warnings can all affect driver confidence. Astrateq is exploring how privacy-first vehicle intelligence can make these signals easier to understand before they become stressful.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 relative overflow-hidden shadow-xs cursor-pointer"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${card.accentColor}`}></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                    {card.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-100 group-hover:scale-125 group-hover:bg-slate-900 transition-all duration-300"></span>
                </div>

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-2xs ${card.iconBg} group-hover:scale-105 transition-transform duration-300`}>
                  {card.icon}
                </div>
                
                <div className="space-y-2 text-left">
                  <h3 className="font-display font-black text-lg sm:text-xl text-slate-950 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans font-semibold">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-950 transition-all duration-300">
                <span>Core Research Metric</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

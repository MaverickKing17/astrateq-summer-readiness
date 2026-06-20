import React from "react";
import { Navigation, AlertTriangle, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function WhyMatters() {
  const cards = [
    {
      id: "longer-drives",
      title: "Longer Drives",
      tag: "BATTERY & ROTATION",
      description: "Cottage trips, highway routes, and weekend travel increase the need for better vehicle awareness.",
      icon: <Navigation className="w-6 h-6 text-indigo-400" />,
      accentColor: "from-indigo-600 to-blue-500",
      iconBg: "bg-indigo-950/80 text-indigo-400 border-indigo-900/50",
      glowColor: "hover:shadow-indigo-500/10 hover:border-indigo-500/40"
    },
    {
      id: "vehicle-signals",
      title: "Vehicle Signals",
      tag: "DIAGNOSTIC TELEMETRY",
      description: "Warning lights and diagnostics often lack context when drivers need clarity most.",
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      accentColor: "from-amber-600 to-orange-500",
      iconBg: "bg-amber-950/80 text-amber-400 border-amber-900/50",
      glowColor: "hover:shadow-amber-500/10 hover:border-amber-500/40"
    },
    {
      id: "data-privacy",
      title: "Data Privacy",
      tag: "ZERO-CLOUD CUSTODY",
      description: "Smarter vehicle technology should not require drivers to surrender control of their data.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      accentColor: "from-emerald-600 to-cyan-500",
      iconBg: "bg-emerald-950/80 text-emerald-400 border-emerald-900/50",
      glowColor: "hover:shadow-emerald-500/10 hover:border-emerald-500/40"
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,1)_0%,rgba(2,6,23,1)_100%)] text-white relative overflow-hidden" id="why-it-matters">
      {/* Background radial soft light blobs for eye comfort */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono font-bold tracking-widest uppercase border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Why This Matters
          </span>
          <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Summer driving creates <br className="hidden sm:inline" />different vehicle signals.
          </h3>
          <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
            Longer routes, heat, traffic, tire pressure changes, and dashboard warnings can all affect driver confidence. Astrateq is exploring how privacy-first vehicle intelligence can make these signals easier to understand before they become stressful.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800/80 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 relative overflow-hidden ${card.glowColor}`}
            >
              {/* Top accent bar matching signature color */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentColor}`}></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                    {card.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-800 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300"></span>
                </div>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs border ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
                    {card.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Dynamic bottom subtle indicator */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-400 opacity-60 group-hover:opacity-100 transition-all duration-300">
                <span>Core Research Metric</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

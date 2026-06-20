import React from "react";
import { Navigation, AlertTriangle, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function WhyMatters() {
  const cards = [
    {
      id: "longer-drives",
      title: "Longer Drives",
      tag: "BATTERY & ROTATION",
      description: "Cottage trips, highway routes, and weekend travel increase the need for better vehicle awareness.",
      icon: <Navigation className="w-6 h-6 text-indigo-600" />,
      accentColor: "from-indigo-500 to-blue-500",
      iconBg: "bg-indigo-50 text-indigo-600",
      glowColor: "hover:shadow-indigo-600/10 hover:border-indigo-200/80"
    },
    {
      id: "vehicle-signals",
      title: "Vehicle Signals",
      tag: "DIAGNOSTIC TELEMETRY",
      description: "Warning lights and diagnostics often lack context when drivers need clarity most.",
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      accentColor: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600",
      glowColor: "hover:shadow-amber-500/10 hover:border-amber-200/80"
    },
    {
      id: "data-privacy",
      title: "Data Privacy",
      tag: "ZERO-CLOUD CUSTODY",
      description: "Smarter vehicle technology should not require drivers to surrender control of their data.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      accentColor: "from-emerald-500 to-cyan-500",
      iconBg: "bg-emerald-50 text-emerald-600",
      glowColor: "hover:shadow-emerald-600/10 hover:border-emerald-200/80"
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/50" id="why-it-matters">
      <div className="max-w-4xl mx-auto px-4 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-mono font-bold tracking-wider uppercase border border-indigo-100/85 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Why This Matters
          </span>
          <h3 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Summer driving creates <br className="hidden sm:inline" />different vehicle signals.
          </h3>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Longer routes, heat, traffic, tire pressure changes, and dashboard warnings can all affect driver confidence. Astrateq is exploring how privacy-first vehicle intelligence can make these signals easier to understand before they become stressful.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 relative overflow-hidden ${card.glowColor}`}
            >
              {/* Top accent bar matching signature color */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentColor}`}></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                    {card.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:scale-125 group-hover:bg-indigo-500 transition-all duration-300"></span>
                </div>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs border border-slate-100/50 ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                    {card.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Dynamic bottom subtle indicator */}
              <div className="pt-5 mt-5 border-t border-slate-100/80 flex items-center gap-1 text-[11px] font-mono font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Core Research Metric</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

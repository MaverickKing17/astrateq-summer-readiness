import React from "react";
import { Navigation, AlertTriangle, ShieldAlert } from "lucide-react";

export default function WhyMatters() {
  const cards = [
    {
      id: "longer-drives",
      title: "Longer Drives",
      description: "Cottage trips, highway routes, and weekend travel increase the need for better vehicle awareness.",
      icon: <Navigation className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50/50 hover:bg-blue-50 border-blue-100/50",
    },
    {
      id: "vehicle-signals",
      title: "Vehicle Signals",
      description: "Warning lights and diagnostics often lack context when drivers need clarity most.",
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      bg: "bg-amber-50/50 hover:bg-amber-50 border-amber-100/50",
    },
    {
      id: "data-privacy",
      title: "Data Privacy",
      description: "Smarter vehicle technology should not require drivers to surrender control of their data.",
      icon: <ShieldAlert className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100/50",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="why-it-matters">
      <div className="max-w-4xl mx-auto px-4 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium tracking-wider uppercase border border-slate-200">
            Why This Matters
          </span>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
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
              className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 ${card.bg}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-slate-100">
                  {card.icon}
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { Gauge, Compass, ShieldCheck } from "lucide-react";

export default function ValueStrip() {
  const items = [
    {
      id: "60-second",
      title: "60-second assessment",
      description: "Quick, automated driver profiling",
      icon: <Gauge className="w-5 h-5 text-slate-950" />,
    },
    {
      id: "gta-drivers",
      title: "Built for Canadian summer driving",
      description: "Optimized for GTA routes & highways",
      icon: <Compass className="w-5 h-5 text-slate-800" />,
    },
    {
      id: "privacy-first",
      title: "Privacy-first vehicle intelligence",
      description: "Zero external cloud telemetry records",
      icon: <ShieldCheck className="w-5 h-5 text-slate-950" />,
    },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-md border-y border-slate-200/50 text-slate-900 py-6 sm:py-8 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-slate-100/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 items-center">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 ${index > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}
            >
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-sm tracking-tight text-slate-950">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 font-sans font-semibold">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

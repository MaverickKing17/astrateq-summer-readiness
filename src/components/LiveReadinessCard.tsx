import React, { useState, useEffect } from "react";
import { Sun, Gauge, EyeOff, Cpu, RefreshCw, Compass, ShieldCheck } from "lucide-react";

export default function LiveReadinessCard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [calibrationProgress, setCalibrationProgress] = useState(84);

  // Subtle telemetry/progress updates to make the card feel alive and highly intelligent
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time micro-fluctuations in calibration progress to show live assessment parameters
      setCalibrationProgress((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 80 && next <= 95 ? next : prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(30,41,59,0.1)] border border-slate-800 bg-slate-950 text-white w-full max-w-sm mx-auto p-6 sm:p-7 group flex flex-col justify-between aspect-square select-none max-h-[440px] md:max-h-none sm:aspect-auto">
      
      {/* 1. Subtle horizontal scanning line */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
      `}} />
      <div className="scan-line" />

      {/* 2. Top Header area with Status Badge and Micro-labels */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-extrabold uppercase">
              READINESS ANALYSIS PREVIEW
            </span>
          </div>
          <span className="text-[10.5px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-md border border-slate-800/80">
            Toronto / GTA context
          </span>
        </div>

        {/* 3. Main Title */}
        <div className="space-y-1 text-left">
          <span className="text-[11px] font-mono text-slate-500 font-black tracking-wider uppercase block">
            CALIBRATION QUEUE ACTIVE
          </span>
          <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-snug">
            Live Vehicle & Driver Readiness Preview
          </h3>
        </div>

        {/* 4. Preview Signal Rows (5 pristine signal tracks) */}
        <div className="space-y-3.5 pt-2">
          
          {/* Row 1: Summer Heat Exposure */}
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400/90 shrink-0 shadow-sm">
                <Sun className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-extrabold text-slate-200">Summer Heat Exposure</span>
                <span className="text-[10px] font-mono text-slate-500 leading-none">Ontario thermal thresholds</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-300 font-bold bg-slate-900/60 px-2 py-0.5 rounded border border-slate-850">
              Moderate
            </span>
          </div>

          {/* Row 2: Highway Usage Pattern */}
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
                <Gauge className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-extrabold text-slate-200">Highway Usage Pattern</span>
                <span className="text-[10px] font-mono text-slate-500 leading-none">GTA expressways velocity</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 font-extrabold bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-900/30">
              Likely High
            </span>
          </div>

          {/* Row 3: Data Privacy Choice - Custody */}
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm">
                <EyeOff className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-extrabold text-slate-200">Privacy Custody Preference</span>
                <span className="text-[10px] font-mono text-slate-500 leading-none">Strict local secure ledger</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">
              Zero Cloud
            </span>
          </div>

          {/* Row 4: Vehicle Signal Complexity (In Progress) */}
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                <Cpu className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-extrabold text-slate-300">Vehicle Signal Complexity</span>
                <span className="text-[10px] font-mono text-slate-500 leading-none">Calibrating CAN interfaces</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-900/20 animate-pulse">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Analyzing... {calibrationProgress}%</span>
            </div>
          </div>

          {/* Row 5: Compatibility Confidence (In Progress) */}
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0 shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-extrabold text-slate-300">Compatibility Confidence</span>
                <span className="text-[10px] font-mono text-slate-500 leading-none">Canadian road conditions check</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-blue-400 bg-blue-950/20 px-2 py-0.5 rounded border border-blue-900/20">
              <RefreshCw className="w-3 h-3 animate-spin text-blue-400 shrink-0" />
              <span>Checking...</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Mini Footer Inside Card to bridge the user curiosity into CTA clicks */}
      <div className="border-t border-slate-900 pt-3.5 mt-4">
        <p className="text-slate-400 text-xs text-center font-sans font-semibold italic flex items-center justify-center gap-2 tracking-wide leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
          <span>Your summer driving profile will be scored after the assessment.</span>
        </p>
      </div>

    </div>
  );
}

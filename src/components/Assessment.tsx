import React, { useState, useEffect } from "react";
import { ASSESSMENT_QUESTIONS, RESULT_STATES } from "../data";
import { Lead, ResultCategory } from "../types";
import { 
  ArrowLeft, CheckCircle2, ChevronRight, Mail, Sparkles, RefreshCw, Layers, Database, 
  ShieldAlert, FileSpreadsheet, Lock, ShieldCheck, Activity, Cpu, Coins, Hourglass, Shield, AlertTriangle, Check, Loader2 
} from "lucide-react";

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { value: string; points: number }>>({});
  const [email, setEmail] = useState("");
  const [isEmailState, setIsEmailState] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calculatedCategory, setCalculatedCategory] = useState<ResultCategory | null>(null);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [storedLeads, setStoredLeads] = useState<Lead[]>([]);
  const [validationError, setValidationError] = useState("");
  const [showInspector, setShowInspector] = useState(false);

  // New pre-launch conversion system states
  const [resultSubStage, setResultSubStage] = useState<'insight' | 'evaluating' | 'commitment' | 'stripe' | 'success'>('insight');
  const [evalProgress, setEvalProgress] = useState(0);
  const [isStripeProcessing, setIsStripeProcessing] = useState(false);
  const [customCalculatedScore, setCustomCalculatedScore] = useState(0);

  // Transition helper states
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Sync localStorage leads
    loadStoredLeads();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resultSubStage === 'evaluating') {
      setEvalProgress(0);
      interval = setInterval(() => {
        setEvalProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setResultSubStage('commitment');
            }, 1200); // brief pause after "System Evaluation Complete" as instructed on page 3
            return 100;
          }
          return prev + 10;
        });
      }, 150); // Increment every 150ms
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resultSubStage]);

  const loadStoredLeads = () => {
    try {
      const stored = localStorage.getItem("astrateq_leads");
      if (stored) {
        setStoredLeads(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  };

  const handleSelectOption = (points: number, value: string) => {
    // Save answer
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: { value, points },
    }));

    // Trigger visual step fade
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (currentStep < 8) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsEmailState(true);
      }
    }, 250);
  };

  const handleBack = () => {
    if (isEmailState) {
      setIsEmailState(false);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setValidationError("Please enter a valid email address so we can send your result.");
      return;
    }

    // Calculate score
    let totalScore = 0;
    Object.keys(answers).forEach((key) => {
      const idx = Number(key);
      const ans = answers[idx];
      if (ans) {
        totalScore += ans.points;
      }
    });

    // Score categorization:
    // Total max points is 31, min points is 8.
    // Points >= 24 -> HIGH_READINESS
    // Points between 15 and 23 -> MODERATE_READINESS
    // Points < 15 -> NEEDS_REVIEW
    let category = ResultCategory.MODERATE_READINESS;
    if (totalScore >= 24) {
      category = ResultCategory.HIGH_READINESS;
    } else if (totalScore < 15) {
      category = ResultCategory.NEEDS_REVIEW;
    }

    setCalculatedCategory(category);
    
    // Scale to a 0-100 conversion score
    const scaledScore = Math.min(100, Math.round((totalScore / 31) * 100));
    setCustomCalculatedScore(scaledScore);
    setResultSubStage('insight');

    // Prepare complete data structure as specified:
    // email, vehicle type, vehicle year, highway driving frequency, summer road trip frequency,
    // dashboard warning familiarity, privacy concern level, interest in early access, result category, timestamp.
    const leadData: Lead = {
      id: "lead_" + Math.random().toString(36).substring(2, 9),
      email: email.trim(),
      vehicleType: answers[1]?.value || "Other",
      vehicleYear: answers[2]?.value || "Not sure",
      highwayDrivingFrequency: answers[3]?.value || "Rarely",
      summerRoadTripFrequency: answers[4]?.value || "Not currently",
      dashboardWarningFamiliarity: answers[5]?.value || "No",
      privacyConcernLevel: answers[6]?.value || "I have not thought about it much",
      interestInEarlyAccess: answers[8]?.value || "No",
      resultCategory: category,
      timestamp: new Date().toISOString(),
    };

    setSubmittedLead(leadData);

    // Save Lead (marked clearly for backend sync)
    saveLead(leadData);

    // Transition to results screen
    setIsEmailState(false);
    setShowResult(true);
  };

  const saveLead = (lead: Lead) => {
    // =========================================================================
    //   CRITICAL: PRODUCTION STORAGE / APIS LOG RESIDENCE
    //   This is where your cloud database synchronizer (like Google Cloud Spanner,
    //   Firestore, or relational API fetch) connects in live deployments:
    // =========================================================================
    //
    //    fetch('/api/v1/leads', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify(lead)
    //    })
    //    .then(res => res.json())
    //    .then(data => console.log("Cloud Saved:", data))
    //    .catch(err => console.error("Cloud Error:", err));
    //
    // =========================================================================

    console.log("💾 Lead Data captured for Astrateq pre-launch cohort:", lead);

    try {
      const stored = localStorage.getItem("astrateq_leads");
      const leadsList = stored ? JSON.parse(stored) : [];
      leadsList.unshift(lead);
      localStorage.setItem("astrateq_leads", JSON.stringify(leadsList));
      setStoredLeads(leadsList);
    } catch (e) {
      console.error("Local storage error:", e);
    }
  };

  const cleanInspector = () => {
    if (window.confirm("Are you sure you want to clear simulated lead records?")) {
      localStorage.removeItem("astrateq_leads");
      setStoredLeads([]);
    }
  };

  const handleRetake = () => {
    setCurrentStep(1);
    setAnswers({});
    setEmail("");
    setIsEmailState(false);
    setShowResult(false);
    setCalculatedCategory(null);
    setSubmittedLead(null);
    setResultSubStage('insight');
    setEvalProgress(0);
    setIsStripeProcessing(false);
    setCustomCalculatedScore(0);
  };

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.min((currentStep / totalQuestions) * 100, 100);
  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep - 1];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100" id="assessment-section">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Outer assessment card wrapping container */}
        <div className="max-w-2xl mx-auto">
          
          {/* Main Assessment State Panel */}
          {!showResult ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl relative overflow-hidden transition-all duration-300">
              
              {/* Outer top highlight decoration line to emphasize premium feel */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan via-indigo-500 to-indigo-600"></div>

              {/* Back / Steps Header */}
              <div className="flex items-center justify-between mb-8">
                {(currentStep > 1 || isEmailState) ? (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-slate-500 hover:text-slate-900 cursor-pointer group"
                    id="back-step-btn"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-400">Question Check</span>
                )}

                <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/30">
                  {isEmailState ? "FINAL STEP" : `STEP ${currentStep} of ${totalQuestions}`}
                </span>
              </div>

              {/* Progress indicator bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full mb-8 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-cyan to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${isEmailState ? 100 : progressPercent}%` }}
                ></div>
              </div>

              {/* Assessment Question & Options OR Email Input */}
              {!isEmailState ? (
                <div className={`space-y-6 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"} transition-all duration-200`}>
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight leading-snug">
                      {currentQuestion.text}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">Select the answer that matches your current vehicle setup.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 pt-4">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentStep]?.value === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleSelectOption(option.points, option.value)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border font-sans font-medium text-sm sm:text-base relative flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                            isSelected
                              ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                              : "bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200/60"
                          }`}
                        >
                          <span className="font-display">{option.label}</span>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity ${
                            isSelected ? "bg-brand-cyan text-slate-900" : "bg-slate-200 text-slate-500"
                          }`}>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Email collection step */
                <form onSubmit={handleEmailSubmit} className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight leading-snug">
                      Where should we send your readiness result?
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-sans">
                      We’ll send your result and pre-launch validation notes. No spam. No payment required.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all duration-200 text-slate-900 text-sm sm:text-base font-semibold"
                        id="email-input-field"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>

                    {validationError && (
                      <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-start gap-2 text-xs text-red-600 font-medium">
                        <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                        <span>{validationError}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group"
                    id="submit-email-cta"
                  >
                    <span>Show My Readiness Result</span>
                    <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans text-center">
                    Astrateq is in pre-launch validation. Your email is used to send your result and optional early-access updates.
                  </p>
                </form>
              )}
            </div>
          ) : (
            /* Results screen displaying matched configuration */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-2xl relative overflow-hidden transition-all duration-300">
              
              {/* Electric premium border glow highlighting specific result class */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan to-indigo-500"></div>

              {/* Sub-steps Indicator specifically styled for our 4-stage psychological conversion funnel */}
              <div className="flex justify-between items-center p-3 mb-8 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-mono select-none">
                {[
                  { key: ['insight'], label: '1. Score' },
                  { key: ['evaluating', 'commitment'], label: '2. Eligibility' },
                  { key: ['stripe'], label: '3. Reservation' },
                  { key: ['success'], label: '4. Complete' }
                ].map((step, idx) => {
                  const subStagesList = ['insight', 'evaluating', 'commitment', 'stripe', 'success'];
                  const isPast = subStagesList.indexOf(resultSubStage) > subStagesList.indexOf(step.key[step.key.length - 1]);
                  const isActive = step.key.includes(resultSubStage);
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-indigo-600 text-white font-semibold' 
                          : isPast 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isPast ? '✓' : idx + 1}
                      </span>
                      <span className={`hidden sm:inline font-sans font-bold transition-colors duration-300 ${isActive ? 'text-indigo-900' : 'text-slate-400'}`}>
                        {step.label.split('. ')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {calculatedCategory && (() => {
                // Determine eligibility patterns dynamically
                const finalPercentScore = customCalculatedScore;
                const ans1 = answers[1]?.value || "Other"; // vehicle type
                const ans2 = answers[2]?.value || "Not sure"; // vehicle year
                const ans3 = answers[3]?.value || "Rarely"; // highway
                const ans4 = answers[4]?.value || "Not currently"; // summer trip
                const ans5 = answers[5]?.value || "No"; // warnings
                const ans6 = answers[6]?.value || "I have not thought about it much"; // privacy

                const isHighPrivacy = ans6 === "Extremely important" || ans6 === "Very important";
                const isModerateHighDriving = 
                  ans3 === "Several times per week" || 
                  ans3 === "Weekly" || 
                  ans4 === "Yes, often" || 
                  ans4 === "Sometimes";
                const isFrequentHighwaySummer = 
                  ans3 === "Several times per week" || 
                  ans4 === "Yes, often";

                // Eligibility logic exactly as specified on Page 2
                const isEligible = finalPercentScore >= 65 || (isHighPrivacy && isModerateHighDriving) || isFrequentHighwaySummer;

                // Generating 3 to 5 customized driving insights
                const insightsList: string[] = [];
                
                if (ans1.includes("SUV") || ans1.includes("crossover")) {
                  insightsList.push("Crossover Adaptive Profile: Your vehicle configuration benefits from torque-vectoring telemetry and tire friction analysis during highway lane changes.");
                } else if (ans1.includes("Sedan")) {
                  insightsList.push("Sedan Optimization Profile: Aerodynamic stability indexes look excellent, matching tight diagnostic parameters for urban bumper-to-bumper stops.");
                } else if (ans1.includes("truck")) {
                  insightsList.push("Light Truck Structural Tuning: Towing payload weights and temperature variances require distinct alerts to protect rear suspension dynamics.");
                } else {
                  insightsList.push("Advanced Diagnostic Mapping: Standard chassis tuning aligns safety responses to your driving style.");
                }

                if (ans5 === "Yes" || ans5.includes("Maybe")) {
                  insightsList.push("Symbol Latency Assist: Pre-launch interface embeds on-screen translation overlays to turn cryptic engine lights into instantly actionable guidelines.");
                } else {
                  insightsList.push("Cognitive Alert Baseline: Your strong dashboard warning familiarity maximizes secondary microdiagnostic charts without visual interruption.");
                }

                if (ans3 === "Several times per week" || ans3 === "Weekly") {
                  insightsList.push("GTA Arterial High-stress Indicator: Sustained highway travel on major GTA corridors causes heavy sensor fatigue, requiring live proactive battery load charting.");
                } else {
                  insightsList.push("Low-Fatigue Driving Calibration: Your routing minimizes daily stop-start gridlocks, meaning your vehicle is optimized for premium long-range summer diagnostics.");
                }

                if (isHighPrivacy) {
                  insightsList.push("Privacy Guard Protocol: Matches Zero Cloud Telemetry criteria. High local isolation prevents continuous metadata profiling of your Toronto-area address.");
                } else {
                  insightsList.push("Encrypted Telemetry Baseline: Secure transport tokens utilize end-to-end anonymization matrices to map local vehicle integrity safely.");
                }

                return (
                  <div className="animate-fade-in space-y-6">

                    {/* STAGE 1 — READINESS SCORE ENGINE */}
                    {resultSubStage === 'insight' && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">STAGE 1: INSIGHT GENERATION</span>
                          <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                            Personalized Driving Intelligence Profile
                          </h4>
                        </div>

                        {/* High Performance Score Graphic */}
                        <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-3xl relative overflow-hidden border border-slate-900">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.16),transparent_65%)]"></div>
                          <div className="relative z-10 text-center space-y-2">
                            <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase font-bold">Intelligence Readiness Index</span>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-5xl sm:text-6xl font-display font-extrabold text-white tracking-tighter">
                                {finalPercentScore}
                              </span>
                              <span className="text-slate-400 font-mono text-lg font-bold">/100</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                              <Activity className="w-3.5 h-3.5 animate-pulse" />
                              <span>Signal Processing Calibrated</span>
                            </div>
                          </div>
                        </div>

                        {/* Diagnostic insights box */}
                        <div className="space-y-3.5">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider px-1">
                            <Cpu className="w-4 h-4 text-indigo-500" />
                            <span>AI-Generated Diagnostics ({insightsList.length})</span>
                          </div>

                          <div className="space-y-3">
                            {insightsList.map((insight, idx) => (
                              <div key={idx} className="p-4 bg-slate-50 border border-slate-100/80 rounded-2xl flex gap-3 text-slate-700 leading-relaxed text-xs sm:text-sm shadow-xs transition-all hover:bg-slate-100/30">
                                <span className="w-5 h-5 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <p className="font-sans font-medium text-slate-600">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* NO CTA shown on this stage, only proceeding button to transition state */}
                        <div className="pt-4 border-t border-slate-100">
                          <button
                            onClick={() => setResultSubStage('evaluating')}
                            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer group"
                            id="navigate-to-stages"
                          >
                            <span>Analyze Founding Cohort Eligibility</span>
                            <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STAGE 2 — ESCALATION MOMENT (ELIGIBILITY SYSTEM) */}
                    {resultSubStage === 'evaluating' && (
                      <div className="text-center py-10 space-y-8 animate-pulse">
                        <div className="space-y-3">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
                            <Loader2 className="w-7 h-7 animate-spin" />
                          </div>
                          <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">STAGE 2: ESCALATION</span>
                          <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                            Evaluating Driver Profile Alignment
                          </h4>
                          <p className="text-slate-500 text-sm max-w-sm mx-auto font-sans">
                            Analyzing diagnostic signals, regional telemetry parameters, and data compliance standards...
                          </p>
                        </div>

                        {/* Simulating Progress checklist */}
                        <div className="max-w-md mx-auto text-left space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-xs sm:text-sm">
                          <div className="flex items-center justify-between text-slate-600 font-mono font-bold mb-2">
                            <span>Diagnostic Engine Query</span>
                            <span>{evalProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden mb-4">
                            <div 
                              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${evalProgress}%` }}
                            ></div>
                          </div>

                          <div className="space-y-2.5 font-mono text-slate-500">
                            <div className="flex items-center gap-2">
                              {evalProgress >= 30 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-300 animate-spin shrink-0"></span>
                              )}
                              <span className={evalProgress >= 30 ? 'text-slate-800 font-semibold' : ''}>Analyzing Canadian regional validation database...</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {evalProgress >= 70 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></span>
                              )}
                              <span className={evalProgress >= 70 ? 'text-slate-800 font-semibold' : ''}>Verifying vehicle signal compatibility criteria...</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {evalProgress >= 100 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></span>
                              )}
                              <span className={evalProgress >= 100 ? 'text-slate-800 font-bold' : ''}>Ensuring data privacy guard minimization bounds...</span>
                            </div>
                          </div>
                        </div>

                        {evalProgress >= 100 && (
                          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 animate-bounce">
                            <Sparkles className="w-4 h-4" />
                            <span>System Evaluation Complete</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STAGE 3 — PRE-ORDER COMMITMENT MOMENT */}
                    {resultSubStage === 'commitment' && (
                      <div className="space-y-6">
                        
                        {/* Elite Compatibility Header based on eligibility logic matches */}
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-center space-y-4">
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-slate-800 shadow-sm">
                            <Shield className="w-3.5 h-3.5 text-brand-cyan" />
                            <span>Status Authenticated</span>
                          </div>
                          
                          <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-snug">
                            {isEligible 
                              ? "Your profile qualifies for founding cohort early access consideration" 
                              : "Your profile is being evaluated for future cohort eligibility"
                            }
                          </h4>
                          <p className="text-slate-600 text-xs sm:text-sm font-sans mx-auto max-w-lg leading-relaxed">
                            Based on your driving profile, the system has identified alignment with early vehicle intelligence validation participants in Canada.
                          </p>
                        </div>

                        {/* Commitment Box UI Block */}
                        <div className="p-6 sm:p-8 bg-indigo-950 text-white rounded-3xl relative overflow-hidden border border-indigo-900 space-y-6">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_60%)]"></div>
                          
                          <div className="relative z-10 space-y-2">
                            <span className="text-[10px] font-mono text-indigo-300 tracking-widest uppercase font-bold block">UI BLOCK: Founding Cohort Access Opportunity</span>
                            <h4 className="font-display font-black text-2xl tracking-tight text-white leading-tight">
                              Secure Position in the Founding Driver Cohort
                            </h4>
                            <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                              You are now viewing a limited pre-launch validation opportunity for the Astrateq Founding Driver Cohort.
                            </p>
                          </div>

                          {/* Context Frame */}
                          <div className="relative z-10 p-4 bg-slate-900/60 rounded-2xl border border-white/5 text-xs sm:text-sm leading-relaxed text-indigo-100 font-sans italic">
                            “Astrateq Gadgets is currently in pre-manufacturing validation. Early participants help define real-world demand before hardware production begins in Canada.”
                          </div>

                          {/* Value Points */}
                          <div className="relative z-10 space-y-3 pt-2">
                            <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-200">
                              <span className="p-1 h-5 w-5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5 font-bold">✓</span>
                              <p className="font-medium">Priority access to founding cohort consideration</p>
                            </div>
                            <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-200">
                              <span className="p-1 h-5 w-5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5 font-bold">✓</span>
                              <p className="font-medium">Influence future vehicle intelligence development direction</p>
                            </div>
                            <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-200">
                              <span className="p-1 h-5 w-5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5 font-bold">✓</span>
                              <p className="font-medium">Reserved position in early Canadian rollout evaluation</p>
                            </div>
                          </div>

                          {/* Controlled Urgency details */}
                          <div className="relative z-10 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center gap-2 text-[11px] text-indigo-200 font-mono">
                            <Hourglass className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                            <span>Founding cohort allocation is limited during the Summer 2026 validation phase.</span>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="pt-2">
                          <button
                            onClick={() => setResultSubStage('stripe')}
                            className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-slate-900 text-white font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer group hover:scale-[1.01]"
                          >
                            <span>Verify & Proceed to Place Reservation</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STAGE 4 — STRIPE RESERVATION TRANSITION (CRITICAL TRUST LAYER) */}
                    {resultSubStage === 'stripe' && (
                      <div className="space-y-6 relative">
                        {isStripeProcessing && (
                          <div className="absolute inset-0 bg-white/95 rounded-2xl z-50 flex flex-col items-center justify-center space-y-4 p-6 text-center animate-fade-in">
                            <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                            <p className="font-mono text-xs text-indigo-600 font-bold tracking-wider animate-pulse uppercase">
                              Redirecting to secure reservation system...
                            </p>
                            <p className="text-slate-400 text-[11px] max-w-xs font-sans">
                              Connecting with Stripe Secure Checkout environment. Secure 256-bit SSL handshake protocol initiated.
                            </p>
                          </div>
                        )}

                        <div className="space-y-2 text-center">
                          <span className="text-[10px] font-mono tracking-widest text-indigo-500 font-bold uppercase">STAGE 4: STRIPE RESERVATION</span>
                          <h4 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                            Confirm Your Founding Cohort Reservation
                          </h4>
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
                            This is a pre-launch reservation, not a product purchase. No hardware is being shipped at this stage. This action reserves your place in the validation cohort.
                          </p>
                        </div>

                        {/* Trust Messaging Grid Block */}
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            <Lock className="w-4 h-4 text-emerald-500" />
                            <span>Trust Verification & Integrity Check</span>
                          </div>

                          <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm text-slate-600">
                            <div className="flex gap-2.5 items-start p-2 hover:bg-slate-100/50 rounded-xl transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                              <p className="font-sans font-semibold text-slate-700">No payment will be processed as a product purchase today</p>
                            </div>
                            <div className="flex gap-2.5 items-start p-2 hover:bg-slate-100/50 rounded-xl transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                              <p className="font-sans font-semibold text-slate-700">This is a reservation validation step</p>
                            </div>
                            <div className="flex gap-2.5 items-start p-2 hover:bg-slate-100/50 rounded-xl transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                              <p className="font-sans font-semibold text-slate-700">Funds (if any) are fully refundable during validation phase</p>
                            </div>
                            <div className="flex gap-2.5 items-start p-2 hover:bg-slate-100/50 rounded-xl transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                              <p className="font-sans font-semibold text-slate-700">Used to allocate founding cohort capacity in Canada</p>
                            </div>
                          </div>
                        </div>

                        {/* Secure payment elements mock layout */}
                        <div className="p-4 bg-slate-100/50 rounded-2xl border border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                              <ShieldCheck className="w-5.5 h-5.5 text-indigo-600" />
                            </div>
                            <div>
                              <p className="font-display font-extrabold text-slate-800">Secure Stripe Checkout Connection</p>
                              <p className="font-mono text-[10px] text-slate-400">Certified Level-1 Compliance Gateway</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                            <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm">VISA</span>
                            <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm">MC</span>
                            <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm">AMEX</span>
                            <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm">STRIPE</span>
                          </div>
                        </div>

                        {/* Stripe Action Buttons */}
                        <div className="space-y-3 pt-2">
                          <button
                            onClick={() => {
                              setIsStripeProcessing(true);
                              setTimeout(() => {
                                setIsStripeProcessing(false);
                                setResultSubStage('success');
                              }, 2200);
                            }}
                            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.01]"
                          >
                            <Lock className="w-4 h-4 text-indigo-200" />
                            <span>Secure Founding Cohort Reservation</span>
                          </button>

                          <button
                            onClick={() => setResultSubStage('commitment')}
                            className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center transition-all duration-300 cursor-pointer"
                          >
                            Back to Offer Details
                          </button>
                        </div>
                      </div>
                    )}

                    {/* POST STRIPE SUCCESS STATE */}
                    {resultSubStage === 'success' && (
                      <div className="space-y-6 text-center py-6">
                        
                        {/* High success animation container */}
                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm flex items-center justify-center mx-auto animate-bounce">
                          <Check className="w-8 h-8" />
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-mono tracking-widest text-emerald-500 font-bold uppercase">RESERVATION COMPLETED</span>
                          <h4 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                            Reservation Confirmed
                          </h4>
                          <p className="text-slate-600 text-sm max-w-md mx-auto font-sans leading-relaxed">
                            Your founding cohort placement has been recorded. You will receive a confirmation email shortly.
                          </p>
                        </div>

                        {/* Premium Registered Ticket Receipt */}
                        <div className="max-w-md mx-auto text-left rounded-3xl bg-slate-950 text-white p-6 border border-slate-900 relative overflow-hidden space-y-4">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_50%)]"></div>
                          
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-xs font-mono text-slate-400">OFFICIAL RECEIPT</span>
                            <span className="text-xs font-mono text-indigo-400 uppercase font-bold">FOUNDING MEMBER</span>
                          </div>

                          <div className="grid grid-cols-2 gap-y-3.5 text-xs font-mono text-slate-300">
                            <div>
                              <p className="text-slate-500 text-[10px]">COHORT STATUS</p>
                              <p className="text-white font-bold">CA-ONT-SUMMER-2026</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px]">VALIDATION PROFILE ID</p>
                              <p className="text-white font-semibold">AQ-{Math.floor(Math.random() * 900000 + 100000)}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px]">AUTHORIZED DRIVER</p>
                              <p className="text-white font-semibold truncate max-w-[140px]">{email}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px]">STATION ID</p>
                              <p className="text-white font-semibold">TOR_VAL_01</p>
                            </div>
                          </div>

                          <div className="border-t border-white/5 pt-3.5 text-[10px] text-slate-400 leading-normal font-sans italic">
                            “This securely seals database custody slot reservation in Astrateq Gadgets hardware allocation queue.”
                          </div>
                        </div>

                        <div className="pt-4 max-w-md mx-auto">
                          <button
                            onClick={handleRetake}
                            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.01]"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Start New Validation Run</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })()}
            </div>
          )}

          {/* PRE-LAUNCH CLIENT LEADS DATA INSPECTOR (Fulfills structure validation requirement for the client) */}
          <div className="mt-8 border border-dashed border-slate-300 rounded-3xl p-4 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowInspector(!showInspector)}
                className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-slate-800 tracking-wider uppercase transition-colors cursor-pointer"
                id="toggle-inspector-btn"
              >
                <Database className="w-4.5 h-4.5 text-indigo-400" />
                <span>Pre-Launch Leads Log ({storedLeads.length})</span>
              </button>

              {storedLeads.length > 0 && showInspector && (
                <button
                  onClick={cleanInspector}
                  className="text-[10px] font-mono text-red-500 hover:text-red-700 uppercase tracking-widest cursor-pointer"
                >
                  Clear Logs
                </button>
              )}
            </div>

            {showInspector && (
              <div className="space-y-4 pt-2 border-t border-slate-200/80 max-h-72 overflow-y-auto animate-fade-in">
                {storedLeads.length === 0 ? (
                  <p className="text-xs text-slate-400 font-sans italic">
                    No leads captured on this browser yet. Submit the form to record a new candidate structure!
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    <div className="p-3 bg-indigo-50/70 border border-indigo-100/60 rounded-xl flex items-start gap-2.5">
                      <FileSpreadsheet className="w-4.5 h-4.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed text-indigo-800">
                        <strong>Simulated Ledger:</strong> These objects are formatted exactly for your remote spreadsheet synchronization or SQL triggers, stored safely in `localStorage`.
                      </div>
                    </div>
                    {storedLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 rounded-2xl bg-white border border-slate-200 text-xs space-y-2 font-mono shadow-xs text-slate-600"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-bold text-slate-800">
                          <span className="text-brand-cyan-light font-display">{lead.email}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-slate-500">
                          <div>Vehicle: {lead.vehicleType} ({lead.vehicleYear})</div>
                          <div>Highway: {lead.highwayDrivingFrequency}</div>
                          <div>Roadtrip: {lead.summerRoadTripFrequency}</div>
                          <div>Warning familiar: {lead.dashboardWarningFamiliarity}</div>
                          <div>Privacy: {lead.privacyConcernLevel.substring(0, 15)}...</div>
                          <div>Result: <span className="font-bold text-slate-700">{lead.resultCategory}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

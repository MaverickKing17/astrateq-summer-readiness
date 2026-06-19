import React, { useState, useEffect } from "react";
import { ASSESSMENT_QUESTIONS, RESULT_STATES } from "../data";
import { Lead, ResultCategory } from "../types";
import { ArrowLeft, CheckCircle2, ChevronRight, Mail, Sparkles, RefreshCw, Layers, Database, ShieldAlert, FileSpreadsheet } from "lucide-react";

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

  // Transition helper states
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Sync localStorage leads
    loadStoredLeads();
  }, []);

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

              {calculatedCategory && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Outer Badge */}
                  <div className="text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold tracking-wider uppercase border border-slate-800 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-brand-cyan-light animate-bounce" />
                      Assessment Matched
                    </span>
                    <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                      {RESULT_STATES[calculatedCategory].title}
                    </h4>
                  </div>

                  {/* Copy box with clean interior border */}
                  <div className="rounded-2xl p-5 sm:p-6 bg-slate-50 border border-slate-100 font-sans leading-relaxed text-slate-700 text-sm sm:text-base space-y-4">
                    <p className="text-slate-700 font-medium">
                      {RESULT_STATES[calculatedCategory].copy}
                    </p>
                    
                    {submittedLead && (
                      <div className="pt-4 border-t border-slate-200/60 mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-500">
                        <div><strong className="text-slate-600">Type:</strong> {submittedLead.vehicleType}</div>
                        <div><strong className="text-slate-600">Year:</strong> {submittedLead.vehicleYear}</div>
                        <div><strong className="text-slate-600">Privacy Preference:</strong> {submittedLead.privacyConcernLevel.split(" ")[0]}</div>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3 pt-2">
                    <a
                      href={RESULT_STATES[calculatedCategory].primaryCta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer group hover:scale-[1.01]"
                    >
                      <span>{RESULT_STATES[calculatedCategory].primaryCta.label}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Secondary CTA: either navigates/anchors or goes to link */}
                    {RESULT_STATES[calculatedCategory].secondaryCta.url.startsWith("#") ? (
                      <a
                        href={RESULT_STATES[calculatedCategory].secondaryCta.url}
                        className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center transition-all duration-300 cursor-pointer block text-center"
                      >
                        {RESULT_STATES[calculatedCategory].secondaryCta.label}
                      </a>
                    ) : (
                      <a
                        href={RESULT_STATES[calculatedCategory].secondaryCta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 text-slate-800 font-display font-bold text-sm sm:text-base tracking-wide flex items-center justify-center transition-all duration-300 cursor-pointer block text-center border border-indigo-100/50"
                      >
                        {RESULT_STATES[calculatedCategory].secondaryCta.label}
                      </a>
                    )}
                  </div>

                  {/* Retake line */}
                  <div className="text-center pt-2">
                    <button
                      onClick={handleRetake}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                      id="retake-assessment-btn"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retake Assessment
                    </button>
                  </div>

                </div>
              )}
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

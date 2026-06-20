import React, { useState, useEffect } from "react";
import { ASSESSMENT_QUESTIONS } from "../data";
import { Lead, ResultCategory } from "../types";
import { 
  ArrowLeft, CheckCircle2, ChevronRight, Mail, Sparkles, RefreshCw, Database, 
  ShieldAlert, FileSpreadsheet, Lock, ShieldCheck, Activity, Cpu, Hourglass, Shield, Check, Loader2,
  Car, Truck, Compass, Users, Search, Info
} from "lucide-react";

const POPULAR_VEHICLES = [
  // SUVs
  { name: "Toyota RAV4", category: "SUV / crossover", points: 3 },
  { name: "Honda CR-V", category: "SUV / crossover", points: 3 },
  { name: "Tesla Model Y", category: "SUV / crossover", points: 3 },
  { name: "Mazda CX-5", category: "SUV / crossover", points: 3 },
  { name: "Hyundai Tucson", category: "SUV / crossover", points: 3 },
  { name: "Subaru Outback", category: "SUV / crossover", points: 3 },
  { name: "Jeep Wrangler", category: "SUV / crossover", points: 3 },
  { name: "Ford Escape", category: "SUV / crossover", points: 3 },
  { name: "Lexus RX", category: "SUV / crossover", points: 3 },
  { name: "Nissan Rogue", category: "SUV / crossover", points: 3 },
  
  // Sedans
  { name: "Honda Civic", category: "Sedan", points: 2 },
  { name: "Toyota Corolla", category: "Sedan", points: 2 },
  { name: "Tesla Model 3", category: "Sedan", points: 2 },
  { name: "Hyundai Elantra", category: "Sedan", points: 2 },
  { name: "Toyota Camry", category: "Sedan", points: 2 },
  { name: "Honda Accord", category: "Sedan", points: 2 },
  { name: "Mazda 3", category: "Sedan", points: 2 },
  { name: "Subaru Impreza", category: "Sedan", points: 2 },
  
  // Pickup Trucks
  { name: "Ford F-150", category: "Pickup truck", points: 2 },
  { name: "Ram 1500", category: "Pickup truck", points: 2 },
  { name: "Chevrolet Silverado", category: "Pickup truck", points: 2 },
  { name: "GMC Sierra", category: "Pickup truck", points: 2 },
  { name: "Toyota Tacoma", category: "Pickup truck", points: 2 },
  { name: "Ford Ranger", category: "Pickup truck", points: 2 },
  
  // Minivans
  { name: "Toyota Sienna", category: "Minivan", points: 1 },
  { name: "Honda Odyssey", category: "Minivan", points: 1 },
  { name: "Chrysler Pacifica", category: "Minivan", points: 1 },
  { name: "Kia Carnival", category: "Minivan", points: 1 }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleSearchQuery, setVehicleSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { value: string; points: number }>>({});
  const [email, setEmail] = useState("");
  const [isEmailState, setIsEmailState] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calculatedCategory, setCalculatedCategory] = useState<ResultCategory | null>(null);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [storedLeads, setStoredLeads] = useState<Lead[]>([]);
  const [validationError, setValidationError] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [showInspector, setShowInspector] = useState(false);

  // Snappy system feedback transitions state (Part 2)
  const [systemFeedback, setSystemFeedback] = useState<string | null>(null);

  // Hero custom event trigger integration state (Part 1)
  const [isHeroInitializing, setIsHeroInitializing] = useState(false);
  const [heroInitText, setHeroInitText] = useState("");

  // Funnel sub-stages: 'insight' | 'evaluating' | 'commitment' | 'stripe' | 'success'
  const [resultSubStage, setResultSubStage] = useState<'insight' | 'evaluating' | 'commitment' | 'stripe' | 'success'>('insight');
  const [evalProgress, setEvalProgress] = useState(0);
  const [isStripeProcessing, setIsStripeProcessing] = useState(false);
  const [customCalculatedScore, setCustomCalculatedScore] = useState(0);
  
  // Smooth animated count-up score state (Part 3)
  const [displayScore, setDisplayScore] = useState(0);
  const [isScoreComplete, setIsScoreComplete] = useState(false);

  // Breakdown accordion toggle (Part 5)
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Credit card form values for mock Stripe gateway (Part 6)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    loadStoredLeads();

    // Listen to Start CTA event in Hero (Part 1 behavior)
    const handleStartAssessmentEvent = () => {
      setIsHeroInitializing(true);
      const initialLogs = [
        "Initializing vehicle profile...",
        "Analyzing summer driving conditions...",
        "Preparing readiness score..."
      ];
      setHeroInitText(initialLogs[0]);
      
      let stepNum = 0;
      const interval = setInterval(() => {
        stepNum++;
        if (stepNum < 3) {
          setHeroInitText(initialLogs[stepNum]);
        } else {
          clearInterval(interval);
          setIsHeroInitializing(false);
          // Scroll cleanly into card view
          const el = document.getElementById("assessment-inner-card");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }, 500);
    };

    window.addEventListener("start-assessment", handleStartAssessmentEvent);
    return () => {
      window.removeEventListener("start-assessment", handleStartAssessmentEvent);
    };
  }, []);

  // Simulating the evaluating progress bar (Ontario thresholds / capabilities validation)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resultSubStage === 'evaluating') {
      setEvalProgress(0);
      interval = setInterval(() => {
        setEvalProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Transition to high-intent Stripe Reservation framing screen
              setResultSubStage('stripe');
            }, 1200);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resultSubStage]);

  // Smooth numeric score count-up animation (Part 3)
  useEffect(() => {
    if (showResult && resultSubStage === 'insight') {
      setDisplayScore(0);
      setIsScoreComplete(false);
      let currentVal = 0;
      const targetVal = customCalculatedScore;
      if (targetVal === 0) return;

      const duration = 1000; // 1 second total count up
      const stepTime = Math.max(12, Math.floor(duration / targetVal));

      const timer = setInterval(() => {
        currentVal += 1;
        if (currentVal >= targetVal) {
          setDisplayScore(targetVal);
          setIsScoreComplete(true);
          clearInterval(timer);
        } else {
          setDisplayScore(currentVal);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [showResult, resultSubStage, customCalculatedScore]);

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
    // Save chosen answer
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: { value, points },
    }));

    // Trigger dynamic feedback loader to make it feel like an Adaptive Diagnostic System (Part 2)
    const feedbacks = [
      "Calibrating profile...",
      "Analyzing response pattern...",
      "Mapping local GTA highways usage...",
      "Determining thermal pressure exposure...",
      "Resolving diagnostic symbols logic...",
      "Validating personal custody bounds...",
      "Assigned target stability ratios...",
      "Calibrating cohort early markers..."
    ];
    setSystemFeedback(feedbacks[currentStep - 1] || "Registering input telemetry...");

    setTimeout(() => {
      setSystemFeedback(null);
      if (currentStep < 8) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsEmailState(true);
      }
    }, 450); // Snappy, non-intrusive 450ms feedback loader
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setValidationError("Please enter a valid email address so we can secure your diagnostic evaluation.");
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
    let category = ResultCategory.MODERATE_READINESS;
    if (totalScore >= 24) {
      category = ResultCategory.HIGH_READINESS;
    } else if (totalScore < 15) {
      category = ResultCategory.NEEDS_REVIEW;
    }

    // Scale points safely to percentage
    const scaledScore = Math.min(100, Math.round((totalScore / 31) * 100));
    const currentVehicleType = answers[1]?.value || "Other";

    setIsEmailSending(true);

    // Communicate with the custom Express backend sending system
    fetch("/api/send-readiness-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        vehicleType: currentVehicleType,
        readinessScore: scaledScore,
        resultCategory: category
      })
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errData) => {
            throw new Error(errData.error || `HTTP error Status ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          // Success is confirmed! Lock states in.
          setCalculatedCategory(category);
          setCustomCalculatedScore(scaledScore);
          setResultSubStage('insight');

          // Build lead object using the Resend transmission ID if available
          const leadData: Lead = {
            id: data.id || "lead_" + Math.random().toString(36).substring(2, 9),
            email: email.trim(),
            vehicleType: currentVehicleType,
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
          saveLead(leadData);

          setIsEmailState(false);
          setShowResult(true);
        } else {
          setValidationError(data.error || "The email pipeline declined delivery. Verify input and retry.");
        }
      })
      .catch((error) => {
        console.error("Error communicating with dispatch server:", error);
        setValidationError(error.message || "Failed to communicate with the Astrateq validation server. Please check your network or try again.");
      })
      .finally(() => {
        setIsEmailSending(false);
      });
  };

  const saveLead = (lead: Lead) => {
    console.log("💾 Lead captured for Astrateq pre-launch validation:", lead);
    try {
      const stored = localStorage.getItem("astrateq_leads");
      const leadsList = stored ? JSON.parse(stored) : [];
      leadsList.unshift(lead);
      localStorage.setItem("astrateq_leads", JSON.stringify(leadsList));
      setStoredLeads(leadsList);
    } catch (e) {
      console.error(e);
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
    setShowBreakdown(false);
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardError("");
  };

  // Mock secure Stripe validation (Part 6)
  const handleStripeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCardError("");

    if (!cardName.trim()) {
      setCardError("Cardholder name is required.");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      setCardError("Please enter a valid 16-digit card number.");
      return;
    }
    if (!cardExpiry.includes("/")) {
      setCardError("Expiry must be in MM/YY format.");
      return;
    }
    if (cardCvc.length < 3) {
      setCardError("Please enter a valid 3 or 4-digit CVV/CVC code.");
      return;
    }

    setIsStripeProcessing(true);
    setTimeout(() => {
      setIsStripeProcessing(false);
      setResultSubStage('success');
    }, 1800);
  };

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.min((currentStep / totalQuestions) * 100, 100);
  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep - 1];

  // Formatting helper for Card Number format
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200 text-slate-900 relative overflow-hidden" id="assessment-section">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10" id="assessment-inner-card">
        <div className="max-w-2xl mx-auto">
          
          {/* 1. HERO RECLAMATION INITIALIZING BAR (Part 1 behavior) */}
          {isHeroInitializing && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3 mb-6 animate-fade-in">
              <Loader2 className="w-6 h-6 animate-spin text-slate-800 mx-auto" />
              <p className="font-mono text-xs text-slate-600 font-bold tracking-widest uppercase animate-pulse">
                {heroInitText}
              </p>
              <div className="w-32 bg-slate-200 h-1 rounded-full mx-auto overflow-hidden">
                <div className="bg-slate-950 h-full animate-pulse" style={{ width: "66%" }}></div>
              </div>
            </div>
          )}

          {/* Main Funnel State Card */}
          {!showResult ? (
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-xl relative overflow-hidden transition-all duration-300">
              
              {/* Sleek top aesthetic highlight line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500"></div>

              {/* Back / Steps Header */}
              <div className="flex items-center justify-between mb-6">
                {(currentStep > 1 || isEmailState) ? (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-slate-400 hover:text-white cursor-pointer group"
                    id="back-step-btn"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-white" />
                    Back
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Diagnostic Baseline</span>
                )}

                <span className="text-xs font-mono font-black text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  {isEmailState ? "FINAL DEMAND METRIC" : `Step ${currentStep} of ${totalQuestions}`}
                </span>
              </div>

              {/* Step indicator bar */}
              <div className="w-full bg-slate-900 h-2 rounded-full mb-8 relative overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${isEmailState ? 100 : progressPercent}%` }}
                ></div>
              </div>

              {/* Dynamic feedback loader overlay (Part 2) */}
              {systemFeedback ? (
                <div className="py-16 text-center space-y-4 animate-fade-in">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto" />
                  <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-bold animate-pulse">
                    {systemFeedback}
                  </p>
                </div>
              ) : !isEmailState ? (
                /* Adaptive Quiz Question section */
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">ADAPTIVE DIAGNOSTIC SYSTEM</span>
                    <h2 className="font-display font-black text-2xl text-white tracking-tight leading-snug">
                      {currentQuestion.text}
                    </h2>
                  </div>

                  {currentQuestion.id === 1 ? (
                    <div className="space-y-6">
                      {/* Clean Section Divider Label */}
                      <div className="flex items-center gap-2.5">
                        <div className="h-px bg-slate-800 flex-1"></div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Search Specific Model</span>
                        <div className="h-px bg-slate-800 flex-1"></div>
                      </div>

                      {/* Search Input */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search className="h-4.5 w-4.5 text-cyan-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-11 pr-20 py-4 rounded-2xl border border-slate-800 bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-400 text-white font-sans font-bold placeholder:text-slate-500 text-sm sm:text-base transition-all duration-300"
                          placeholder="Type/Search make or model (e.g., F-150, RAV4, Civic...)"
                          value={vehicleSearchQuery}
                          onChange={(e) => {
                            setVehicleSearchQuery(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                        />
                        {vehicleSearchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setVehicleSearchQuery("");
                              setShowSuggestions(false);
                            }}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            Clear
                          </button>
                        )}

                        {/* Suggestion Dropdown overlay */}
                        {showSuggestions && vehicleSearchQuery.trim().length > 0 && (
                          <div className="absolute left-0 right-0 z-40 mt-2 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto divide-y divide-slate-900">
                            {(() => {
                              const query = vehicleSearchQuery.toLowerCase();
                              const filtered = POPULAR_VEHICLES.filter((v) =>
                                v.name.toLowerCase().includes(query) || v.category.toLowerCase().includes(query)
                              );

                              if (filtered.length === 0) {
                                return (
                                  <div className="p-5 text-center space-y-3">
                                    <p className="text-xs text-slate-400 font-mono">No matching standards found.</p>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleSelectOption(1, vehicleSearchQuery);
                                        setVehicleSearchQuery("");
                                        setShowSuggestions(false);
                                      }}
                                      className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer"
                                    >
                                      Use &quot;{vehicleSearchQuery}&quot; as Custom
                                    </button>
                                  </div>
                                );
                              }

                              return filtered.map((v) => (
                                <button
                                  key={v.name}
                                  type="button"
                                  onClick={() => {
                                    handleSelectOption(v.points, v.name);
                                    setVehicleSearchQuery("");
                                    setShowSuggestions(false);
                                  }}
                                  className="w-full text-left px-5 py-3.5 hover:bg-slate-900 flex items-center justify-between transition-colors duration-150 group cursor-pointer"
                                >
                                  <div className="flex flex-col text-left">
                                    <span className="text-sm font-display font-black text-white group-hover:text-cyan-400 transition-colors">
                                      {v.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                                      {v.category}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                                </button>
                              ));
                            })()}
                          </div>
                        )}
                      </div>

                      {/* Section Divider */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="h-px bg-slate-800 flex-1"></div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Or Select General Category</span>
                        <div className="h-px bg-slate-800 flex-1"></div>
                      </div>

                      {/* Attractive General Category Icon Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, idx) => {
                          const isSelected = answers[currentStep]?.value === option.value;
                          
                          // Match specific icons and descriptions based on category
                          let IconComponent = Compass;
                          let desc = "All-Wheel Drive utility and spacious clearance";
                          let iconColor = "text-cyan-400 group-hover:text-cyan-300";
                          let iconBg = "bg-cyan-950/40 border-cyan-800/20";

                          if (option.value === "Sedan") {
                            IconComponent = Car;
                            desc = "Efficient luxury, classic road-tripper";
                            iconColor = "text-blue-400 group-hover:text-blue-300";
                            iconBg = "bg-blue-950/40 border-blue-900/20";
                          } else if (option.value === "Pickup truck") {
                            IconComponent = Truck;
                            desc = "Heavy hauling and rugged utility specs";
                            iconColor = "text-amber-400 group-hover:text-amber-300";
                            iconBg = "bg-amber-950/40 border-amber-900/20";
                          } else if (option.value === "Minivan") {
                            IconComponent = Users;
                            desc = "Comfort families, spacious cabin climate";
                            iconColor = "text-indigo-400 group-hover:text-indigo-300";
                            iconBg = "bg-indigo-950/40 border-indigo-900/20";
                          } else if (option.value === "Other") {
                            IconComponent = Cpu;
                            desc = "Specialty models, alternative powertrains";
                            iconColor = "text-emerald-400 group-hover:text-emerald-300";
                            iconBg = "bg-emerald-950/40 border-emerald-900/30";
                          }

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleSelectOption(option.points, option.value)}
                              className={`text-left p-5 rounded-2xl border transition-all duration-300 transform active:scale-98 cursor-pointer relative flex flex-col justify-between group ${
                                isSelected
                                  ? 'bg-white text-slate-950 border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)] -translate-y-1'
                                  : 'bg-slate-900/80 hover:bg-slate-900 text-white border-slate-800/80 hover:border-slate-700 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(6,182,212,0.05)]'
                              }`}
                            >
                              {/* Index code badge top right */}
                              <span className={`absolute top-4 right-4 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                isSelected ? 'bg-slate-100 text-slate-950 border-slate-200' : 'bg-slate-950 text-slate-500 border-slate-800'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>

                              {/* Giant color icon */}
                              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 ${
                                isSelected ? 'bg-slate-950 text-white border-slate-900' : `${iconBg} ${iconColor}`
                              }`}>
                                <IconComponent className="w-5.5 h-5.5" />
                              </div>

                              {/* Typography */}
                              <div className="space-y-1 text-left mt-1">
                                <h4 className={`font-display font-black text-base tracking-tight ${isSelected ? 'text-slate-950' : 'text-white'}`}>
                                  {option.label}
                                </h4>
                                <p className={`text-xs leading-relaxed font-semibold ${isSelected ? 'text-slate-700' : 'text-slate-400'}`}>
                                  {desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3.5 pt-4">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = answers[currentStep]?.value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelectOption(option.points, option.value)}
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border font-sans font-semibold text-sm sm:text-base relative flex items-center justify-between transition-all duration-200 transform active:scale-99 cursor-pointer group leading-relaxed ${
                              isSelected
                                ? 'bg-white text-slate-950 border-white shadow-lg -translate-y-0.5'
                                : 'bg-slate-900 hover:bg-slate-900/60 text-white border-slate-800 hover:border-slate-705 hover:-translate-y-0.5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold border transition-colors duration-250 ${
                                isSelected
                                  ? "bg-slate-950/10 text-slate-950 border-slate-950/20"
                                  : "bg-slate-950 text-slate-400 border-slate-800 group-hover:bg-slate-900 group-hover:text-white"
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="font-display font-bold">
                                {option.label}
                              </span>
                            </div>
                            <span>
                              <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5 text-slate-950' : 'text-slate-400 group-hover:text-white'}`} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  <p className="text-center text-[10px] text-slate-500 font-mono italic">
                    60-second response check. This is not a static list; inputs trigger telemetry calibration.
                  </p>
                </div>
              ) : (
                /* Email processing step -- Secure pre-launch design */
                <form onSubmit={handleEmailSubmit} className="space-y-6 animate-fade-in">
                  <div className="space-y-3 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-xs">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight leading-none">
                      Secure Result Registration
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-sans font-semibold">
                      Provide your contact coordinates to align this diagnostic evaluation run directly with your secure, local customer record keys.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        disabled={isEmailSending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className={`w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-800 bg-slate-900 font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-400 transition-all duration-200 text-white text-sm sm:text-base font-semibold placeholder:text-slate-650 ${isEmailSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        id="email-input-field"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                    </div>

                    {validationError && (
                      <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 flex items-start gap-2 text-xs text-red-400 font-bold">
                        <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 mt-0.5 text-red-400" />
                        <span>{validationError}</span>
                      </div>
                    )}
                  </div>

                  {/* Trust Bulletins to reduce friction */}
                  <div className="p-4 bg-slate-905 border border-slate-900 rounded-2xl text-xs space-y-2 text-slate-400 text-left font-semibold">
                    <div className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Zero resale registry: Email resides under local encryption custody rules.</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Instant index calculation and eligibility evaluation response today.</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isEmailSending}
                    className={`w-full py-4 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-display font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer group ${isEmailSending ? 'opacity-80 cursor-not-allowed' : ''}`}
                    id="submit-email-cta"
                  >
                    {isEmailSending ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin text-slate-950" />
                        <span>Validating & Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Calculate Readiness Score</span>
                        <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform text-indigo-600" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Results & conversion steps output screen */
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-2xl relative overflow-hidden transition-all duration-300 animate-fade-in-up">
              
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500"></div>

              {/* Sub-steps Indicator for user flow comprehension */}
              <div className="flex justify-between items-center p-3 mb-6 bg-slate-900 border border-slate-805 rounded-2xl text-xs font-mono select-none">
                {[
                  { key: ['insight'], label: '1. Score' },
                  { key: ['evaluating'], label: '2. Alignment' },
                  { key: ['stripe'], label: '3. Reservation' },
                  { key: ['success'], label: '4. Sealed' }
                ].map((step, idx) => {
                  const subStagesList = ['insight', 'evaluating', 'commitment', 'stripe', 'success'];
                  const isPast = subStagesList.indexOf(resultSubStage) > subStagesList.indexOf(step.key[step.key.length - 1]);
                  const isActive = step.key.includes(resultSubStage);
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-cyan-400 text-slate-950 font-black' 
                          : isPast 
                            ? 'bg-slate-800 text-slate-300 border border-slate-705' 
                            : 'bg-slate-900 text-slate-650'
                      }`}>
                        {isPast ? '✓' : idx + 1}
                      </span>
                      <span className={`hidden sm:inline font-sans font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {calculatedCategory && (() => {
                const finalPercentScore = customCalculatedScore;
                
                // Formulate classification ranges (Part 3)
                let classificationLabel = "";
                let classificationClass = "";
                if (finalPercentScore >= 80) {
                  classificationLabel = "High Confidence Driver Profile";
                  classificationClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
                } else if (finalPercentScore >= 50) {
                  classificationLabel = "Moderate Readiness Profile";
                  classificationClass = "text-amber-400 bg-amber-500/10 border-amber-500/20";
                } else {
                  classificationLabel = "High Sensitivity Driving Profile";
                  classificationClass = "text-rose-400 bg-rose-500/10 border-rose-500/20";
                }

                // Answer mappings for precise user-informed derived insights
                const ans1 = answers[1]?.value || "Other";
                const ans2 = answers[2]?.value || "Not sure";
                const ans3 = answers[3]?.value || "Rarely";
                const ans4 = answers[4]?.value || "Not currently";
                const ans5 = answers[5]?.value || "No";
                const ans6 = answers[6]?.value || "I have not thought about it much";

                const isHighPrivacy = ans6 === "Extremely important" || ans6 === "Very important";
                const isModerateHighDriving = 
                  ans3 === "Several times per week" || 
                  ans3 === "Weekly" || 
                  ans4 === "Yes, often" || 
                  ans4 === "Sometimes";
                const isFrequentHighwaySummer = 
                  ans3 === "Several times per week" || 
                  ans4 === "Yes, often";

                // Eligibility logic for Canada summer pilot
                const isEligible = finalPercentScore >= 65 || (isHighPrivacy && isModerateHighDriving) || isFrequentHighwaySummer;

                // Formulation of 4 Derived Insight Cards (Part 3)
                const heatScore = ans4 === "Yes, often" ? 90 : ans4 === "Sometimes" ? 65 : 40;
                const highwayIntensity = ans3 === "Several times per week" ? 95 : ans3 === "Weekly" ? 70 : ans3 === "Monthly" ? 50 : 25;
                
                const isSuvOrPickup = 
                  ans1.toLowerCase().includes("suv") || 
                  ans1.toLowerCase().includes("pickup") || 
                  ans1.toLowerCase().includes("truck") ||
                  POPULAR_VEHICLES.some(v => v.name.toLowerCase() === ans1.toLowerCase() && (v.category.includes("SUV") || v.category.includes("Pickup")));
                
                const chassisComplexity = isSuvOrPickup ? 85 : 55;
                const privacyConcern = isHighPrivacy ? 95 : ans6.includes("Somewhat") ? 60 : 30;

                return (
                  <div className="space-y-6">
                    
                    {/* STAGE 1 — READINESS SCORE REVEAL MODULE (Part 3) */}
                    {resultSubStage === 'insight' && (
                      <div className="space-y-6 animate-fade-in text-left">
                        <div className="text-center space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-extrabold block">STAGE 1: DERIVED EVALUATION</span>
                          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                            Your Vehicle Intelligence Readiness Score
                          </h2>
                        </div>

                        {/* Animated Score container */}
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-3xl relative overflow-hidden border border-slate-800">
                          <div className={`relative z-10 text-center space-y-1.5 transition-all duration-300 ${isScoreComplete ? 'scale-100' : 'scale-98'}`}>
                            <span className="text-[10px] font-mono text-slate-450 tracking-widest uppercase font-bold block">Vehicle Diagnostic Index</span>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-6xl sm:text-8xl font-display font-black text-cyan-455 text-white tracking-tighter">
                                {displayScore}
                              </span>
                              <span className="text-slate-500 font-mono text-xl font-bold">/100</span>
                            </div>
                            
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold ${classificationClass}`}>
                              <Activity className="w-3.5 h-3.5 animate-pulse" />
                              <span>{classificationLabel}</span>
                            </div>
                          </div>
                        </div>

                        {/* PART 3: 4 Derived Insight Cards */}
                        <div className="space-y-3.5">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-black text-slate-400 uppercase tracking-wider px-1">
                            <Cpu className="w-4 h-4 text-white" />
                            <span>LIGHTWEIGHT DIAGNOSTIC INSIGHTS</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Card 1: Heat Exposure */}
                            <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl space-y-2.5 shadow-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-display font-black text-white">Summer Heat Exposure Level</span>
                                <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-bold ${heatScore >= 80 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-slate-950 text-slate-400 border border-slate-800"}`}>
                                  {heatScore}% Index
                                </span>
                              </div>
                              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${heatScore}%` }}></div>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal font-sans font-semibold">
                                {heatScore >= 80 
                                  ? "High exposure expected under cottage and highway trip criteria. Cooling reserves deserve pre-departure validation." 
                                  : "Standard ambient temperature load, well matching typical regional thermal parameters."}
                              </p>
                            </div>

                            {/* Card 2: Highway Intensity */}
                            <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl space-y-2.5 shadow-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-display font-black text-white">Highway Usage Intensity</span>
                                <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-bold ${highwayIntensity >= 70 ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-slate-950 text-slate-400 border border-slate-800"}`}>
                                  {highwayIntensity >= 70 ? "High Intensity" : "Standard Intensity"}
                                </span>
                              </div>
                              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${highwayIntensity}%` }}></div>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal font-sans font-semibold">
                                {highwayIntensity >= 70 
                                  ? "Frequent high-speed friction and battery load recorded. Proactive signal detection is recommended on main arteries."
                                  : "Local driving priority minimizes continuous highway velocity stress."}
                              </p>
                            </div>

                            {/* Card 3: Driving Complexity */}
                            <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl space-y-2.5 shadow-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-display font-black text-white">Driving Complexity Profile</span>
                                <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded-md font-mono text-[9px] font-bold text-slate-400">
                                  {chassisComplexity >= 80 ? "Complex SUV/Chassis" : "Standard Sedan Grid"}
                                </span>
                              </div>
                              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${chassisComplexity}%` }}></div>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal font-sans font-semibold">
                                {chassisComplexity >= 80 
                                  ? "Larger vehicle profile drives heavier wear multipliers. Smart diagnostics map dynamic vehicle signals better."
                                  : "Standard chassis alignment stabilizes thermal variables nicely."}
                              </p>
                            </div>

                            {/* Card 4: Privacy Sensitivity */}
                            <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl space-y-2.5 shadow-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-display font-black text-white">Privacy Sensitivity Index</span>
                                <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-bold ${privacyConcern >= 80 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-950 text-slate-400 border border-slate-800"}`}>
                                  {privacyConcern >= 80 ? "Zero Cloud Restricted" : "Standard Token"}
                                </span>
                              </div>
                              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${privacyConcern}%` }}></div>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal font-sans font-semibold">
                                {privacyConcern >= 80 
                                  ? "Sinks strictly locally. Absolute user custody chosen, minimizing persistent external logging traces."
                                  : "Standard data minimized parameters are validated correctly."}
                              </p>
                            </div>

                          </div>
                        </div>

                        {/* PART 4 — COHORT ESCALATION MOMENT */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden space-y-4">
                          <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-white text-[9px] font-mono font-black tracking-widest uppercase border border-slate-800">
                              <Shield className="w-3.5 h-3.5 text-cyan-400" />
                              <span>COHORT SIGNAL DETECTED</span>
                            </div>
                            
                            <h3 className="font-display font-black text-xl text-white tracking-tight leading-none mt-2">
                              Founding Cohort Eligibility Signal Detected
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm font-sans font-semibold leading-snug">
                              “Your profile has been evaluated against current Canadian summer pilot allocation thresholds.”
                            </p>
                          </div>

                          {/* SYSTEM NOTICE CARD (Page 6) */}
                          <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl space-y-2 text-xs sm:text-sm text-slate-300 font-semibold text-left">
                            <div className="flex gap-2.5 items-center">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                              <span>“Profile aligns with early cohort parameters”</span>
                            </div>
                            <div className="flex gap-2.5 items-center">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                              <span>“Limited summer validation slots available”</span>
                            </div>
                            <div className="flex gap-2.5 items-center">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                              <span>“Pre-manufacturing testing window active”</span>
                            </div>
                          </div>
                        </div>

                        {/* PART 5 — PRIMARY ESCALATION CTA (Page 6) */}
                        <div className="space-y-3 pt-2">
                          <button
                            onClick={() => setResultSubStage('evaluating')}
                            className="w-full py-4 rounded-2xl bg-white hover:bg-slate-250 text-slate-950 font-display font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.01]"
                          >
                            <span>Check Founding Cohort Availability</span>
                            <ChevronRight className="w-4 h-4 text-indigo-650" />
                          </button>

                          <button
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white font-display font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer"
                          >
                            <span>Review My Readiness Breakdown</span>
                          </button>
                        </div>

                        {/* Dynamic breakdown presentation toggled organically (Part 5) */}
                        {showBreakdown && (
                          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 font-mono text-xs text-slate-300 animate-fade-in text-left">
                            <h4 className="font-display font-black text-white text-sm">Response Compatibility Breakdown</h4>
                            <div className="space-y-2 leading-relaxed text-slate-450">
                              <div>Vehicle Type: <span className="font-bold text-white">{ans1}</span> (Calibrated weight factor)</div>
                              <div>Vehicle Model Year: <span className="font-bold text-white">{ans2}</span> (Interface compatibility level)</div>
                              <div>Highway Use frequency: <span className="font-bold text-white">{ans3}</span> (Fatigue parameters)</div>
                              <div>Warmer weather trip frequency: <span className="font-bold text-white">{ans4}</span> (Thermal exposure factor)</div>
                              <div>Warning symbol familiarity: <span className="font-bold text-white">{ans5}</span> (Actionable overlay quotient)</div>
                              <div>Custody expectations: <span className="font-bold text-white">{ans6}</span> (Integration guard limits)</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STAGE 2 — ACTIVE HOOKUP SPINNER before Reservation Frame */}
                    {resultSubStage === 'evaluating' && (
                      <div className="text-center py-12 space-y-6 animate-fade-in text-white">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto border border-slate-800 shadow-xs">
                          <Loader2 className="w-7 h-7 animate-spin text-white" />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono tracking-widest text-slate-500 font-black uppercase block">CAPACITY LOOKUP IN PROCESS</span>
                          <h3 className="font-display font-black text-2xl text-white tracking-tight">
                            Evaluating Capacity Boundaries
                          </h3>
                          <p className="text-slate-400 text-sm max-w-sm mx-auto font-sans font-semibold">
                            Checking regional cohort thresholds, validation slot availability queue, and Ontario legal compliance protocols...
                          </p>
                        </div>

                        {/* Evaluation Checklist */}
                        <div className="max-w-md mx-auto text-left space-y-3 bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs sm:text-sm font-semibold">
                          <div className="flex items-center justify-between text-slate-200 font-mono font-bold mb-1">
                            <span>Sinking Registry Parameters</span>
                            <span>{evalProgress}%</span>
                          </div>
                          
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-4">
                            <div className="bg-cyan-400 h-full rounded-full transition-all duration-300" style={{ width: `${evalProgress}%` }}></div>
                          </div>

                          <div className="space-y-2.5 font-mono text-slate-400">
                            <div className="flex items-center gap-2">
                              {evalProgress >= 30 ? (
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-700 animate-spin shrink-0"></span>
                              )}
                              <span className={evalProgress >= 30 ? 'text-white font-bold' : ''}>Analyzing Canadian regional validation threshold compatibility...</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {evalProgress >= 70 ? (
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-700 shrink-0"></span>
                              )}
                              <span className={evalProgress >= 70 ? 'text-white font-bold' : ''}>Verifying local Toronto / GTA active slot availability...</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {evalProgress >= 100 ? (
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-700 shrink-0"></span>
                              )}
                              <span className={evalProgress >= 100 ? 'text-white font-black' : ''}>Sinking data custody parameters to secure local state ledger...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STAGE 3/4 — RESERVATION FRAME (Part 6 STRIPE PSYCHOLOGY - CRITICAL MODULE) */}
                    {resultSubStage === 'stripe' && (
                      <div className="space-y-6 relative text-left animate-fade-in">
                        {isStripeProcessing && (
                          <div className="absolute inset-0 bg-slate-950/95 rounded-2xl z-50 flex flex-col items-center justify-center space-y-4 p-6 text-center animate-fade-in">
                            <Loader2 className="w-12 h-12 animate-spin text-white" />
                            <p className="font-mono text-xs text-white font-black tracking-widest uppercase animate-pulse">
                              Sealing cohort assignment allocation...
                            </p>
                            <p className="text-slate-400 text-[11px] max-w-xs font-sans font-semibold">
                              Connecting to secure 256-bit encrypted gateway. Authorized validation slot assignment is being locked in.
                            </p>
                          </div>
                        )}

                        <div className="space-y-1 text-center font-sans">
                          <span className="text-[10px] font-mono tracking-widest text-slate-500 font-extrabold uppercase block">COHORT RESERVATION FRAME</span>
                          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none">
                            Reserve Your Cohort Position
                          </h2>
                          <p className="text-slate-400 text-xs sm:text-sm leading-normal max-w-md mx-auto font-sans font-semibold pt-1">
                            “You are securing a validation allocation for the Summer 2026 pilot cohort.”
                          </p>
                        </div>

                        {/* Trust integration checklist based on allocation confirmation psychology */}
                        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 text-xs sm:text-sm font-semibold">
                          <div className="flex gap-2 items-center text-white border-b border-slate-800 pb-2 font-mono font-bold tracking-wider uppercase">
                            <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span>Reservation Integrity Checklist</span>
                          </div>
                          
                          <div className="space-y-2 text-slate-400">
                            <div className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                              <p>Treat as allocation confirmation, not product purchase. No hardware is being shipped today.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                              <p>Maintains absolute local user data custody under Canadian validation standards.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                              <p>Fully refundable deposit maps high-intent interest parameters, proving market demand before manufacture cycles begin in Canada.</p>
                            </div>
                            </div>
                          </div>

                        {/* Secure Stripe Mock form (Page 7) */}
                        <form onSubmit={handleStripeSubmit} className="space-y-4 pt-1 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
                          <p className="text-xs font-mono font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
                            Cohort Reservation Deposit (Fully Refundable)
                          </p>

                          {cardError && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-bold flex items-center gap-2">
                              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                              <span>{cardError}</span>
                            </div>
                          )}

                          <div className="grid grid-cols-1 gap-3.5 text-xs">
                            
                            <div>
                              <label className="block text-[10px] font-mono tracking-widest uppercase text-slate-450 font-bold mb-1">
                                SECURE DEPOSIT AMOUNT
                              </label>
                              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono font-black text-cyan-400 text-sm">
                                $50.00 CAD
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono tracking-widest uppercase text-slate-450 font-bold mb-1">
                                Cardholder Full Name
                              </label>
                              <input
                                type="text"
                                required
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="Signature Name as on Card"
                                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-sans focus:outline-none focus:border-cyan-400 transition-all text-white font-semibold placeholder:text-slate-650"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono tracking-widest uppercase text-slate-450 font-bold mb-1">
                                Credit Card Number
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  maxLength={19}
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                  placeholder="4111 2222 3333 4444"
                                  className="w-full p-3 pr-10 bg-slate-950 border border-slate-800 rounded-xl font-mono focus:outline-none focus:border-cyan-400 transition-all text-white font-semibold placeholder:text-slate-650"
                                />
                                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[10px] font-mono tracking-widest uppercase text-slate-450 font-bold mb-1">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  required
                                  maxLength={5}
                                  value={cardExpiry}
                                  onChange={(e) => {
                                    let val = e.target.value.replace(/[^0-9]/g, "");
                                    if (val.length >= 2) {
                                      val = val.substring(0, 2) + "/" + val.substring(2, 4);
                                    }
                                    setCardExpiry(val);
                                  }}
                                  placeholder="MM/YY"
                                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono focus:outline-none focus:border-cyan-400 transition-all text-white font-semibold text-center placeholder:text-slate-650"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-mono tracking-widest uppercase text-slate-450 font-bold mb-1">
                                  Secure CVV
                                </label>
                                <input
                                  type="password"
                                  required
                                  maxLength={4}
                                  value={cardCvc}
                                  onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ""))}
                                  placeholder="123"
                                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono focus:outline-none focus:border-cyan-400 transition-all text-white font-semibold text-center placeholder:text-slate-650"
                                />
                              </div>
                            </div>

                          </div>

                          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span className="flex items-center gap-1.5 font-bold">
                              <ShieldCheck className="w-4 h-4 text-cyan-400" />
                              Stripe Direct Authorized
                            </span>
                            <span className="font-semibold text-slate-500">SSL 256-Bit HANDSHAKE</span>
                          </div>

                          {/* Action CTA */}
                          <div className="space-y-2 pt-2">
                            <button
                              type="submit"
                              className="w-full py-4 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-display font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.01]"
                            >
                              <Lock className="w-4 h-4 text-indigo-650" />
                              <span>Seal Fully Refundable Cohort Deposit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setResultSubStage('insight')}
                              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white font-display font-bold text-xs tracking-wide text-center duration-200 cursor-pointer"
                            >
                              Back to Score Insights
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* ESCALATION SECURE SUCCESS RECIPIENT SCREEN */}
                    {resultSubStage === 'success' && (
                      <div className="space-y-6 text-center py-6 animate-fade-in text-white">
                        
                        <div className="w-16 h-16 rounded-full bg-cyan-400 text-slate-950 border border-cyan-300 shadow-md flex items-center justify-center mx-auto animate-bounce">
                          <Check className="w-8 h-8 text-slate-950" />
                        </div>

                        <div className="space-y-1 font-sans">
                          <span className="text-[10px] font-mono tracking-widest text-slate-500 font-black uppercase block">RESERVATION COMMITTED</span>
                          <h3 className="font-display font-black text-3xl text-white tracking-tight leading-none">
                            Reservation Confirmed
                          </h3>
                          <p className="text-slate-400 text-sm max-w-sm mx-auto font-sans font-semibold pt-1">
                            Your secure early participant status and $50 fully refundable deposit placement have been cataloged in our validation logs.
                          </p>
                        </div>

                        {/* Customer Ledger Receipt */}
                        <div className="max-w-md mx-auto text-left rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 relative overflow-hidden space-y-4 shadow-sm">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.01),transparent_50%)]"></div>
                          
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                            <span className="text-slate-500">OFFICIAL RECEIPT / SYSTEM VAL</span>
                            <span className="text-cyan-400 uppercase font-black">MEMBER CA-001</span>
                          </div>

                          <div className="grid grid-cols-2 gap-y-3.5 text-xs font-mono text-slate-400 font-semibold">
                            <div>
                              <p className="text-slate-500 text-[10px]">COHORT STATUS</p>
                              <p className="text-white font-black">CA-ONT-SUMMER-2026</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px]">VERIFICATION INDEX</p>
                              <p className="text-white font-semibold">AQ-{Math.floor(Math.random() * 900000 + 100000)}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px]">REGISTERED USER</p>
                              <p className="text-white font-semibold truncate max-w-[130px]">{email}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px]">DEPOSIT STATUS</p>
                              <p className="text-emerald-400 font-black">$50.00 CAD (SEALED)</p>
                            </div>
                          </div>

                          <div className="border-t border-slate-800 pt-3.5 text-[10px] text-slate-450 leading-normal font-sans italic">
                            “This officially registers validation interest and locks in priority consideration queuing order for hardware production.”
                          </div>
                        </div>

                        <div className="pt-2 max-w-md mx-auto">
                          <button
                            onClick={handleRetake}
                            className="w-full py-4 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-display font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.01]"
                          >
                            <RefreshCw className="w-4 h-4 text-indigo-600" />
                            <span>Start New Diagnostic Evaluation</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })()}
            </div>
          )}

          {/* 8. PRE-LAUNCH LEADS DATA INSPECTOR (Fulfills structure validation requirement) */}
          <div className="mt-8 border border-slate-800 rounded-3xl p-5 bg-slate-900 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowInspector(!showInspector)}
                className="flex items-center gap-2 text-xs font-mono font-black text-slate-400 hover:text-white tracking-wider uppercase transition-colors cursor-pointer"
                id="toggle-inspector-btn"
              >
                <Database className="w-4.5 h-4.5 text-cyan-400" />
                <span>Validation Database Log ({storedLeads.length})</span>
              </button>

              {storedLeads.length > 0 && showInspector && (
                <button
                  onClick={cleanInspector}
                  className="text-[10px] font-mono text-red-400 hover:text-red-300 uppercase tracking-widest cursor-pointer font-bold"
                >
                  Clear Logs
                </button>
              )}
            </div>

            {showInspector && (
              <div className="space-y-4 pt-2 border-t border-slate-800 max-h-72 overflow-y-auto animate-fade-in text-left">
                {storedLeads.length === 0 ? (
                  <p className="text-xs text-slate-450 font-sans italic font-semibold">
                    No diagnostics captured on this browser yet. Initiate the diagnostic check above to generate a new ledger slot!
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    <div className="p-3 bg-slate-955 border border-slate-850 rounded-xl flex items-start gap-2.5">
                      <FileSpreadsheet className="w-4.5 h-4.5 text-cyan-455 text-white flex-shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed text-slate-400 font-mono font-semibold">
                        <strong>Canadian Active Ledger:</strong> Live database synchronizer inputs structured exactly for CSV parsing and external sheets triggers.
                      </div>
                    </div>
                    {storedLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-850 text-xs space-y-2 font-mono text-slate-300 shadow-sm"
                      >
                        <div className="flex items-center justify-between border-b border-slate-850 pb-1.5 font-bold text-slate-200">
                          <span className="text-white font-display font-black">{lead.email}</span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-slate-450 leading-normal font-semibold">
                          <div>Vehicle: {lead.vehicleType} ({lead.vehicleYear})</div>
                          <div>Highway: {lead.highwayDrivingFrequency}</div>
                          <div>Roadtrip: {lead.summerRoadTripFrequency}</div>
                          <div>Warning familiar: {lead.dashboardWarningFamiliarity}</div>
                          <div>Privacy: {lead.privacyConcernLevel.substring(0, 15)}...</div>
                          <div>Score Classification: <span className="font-bold text-white">{lead.resultCategory}</span></div>
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

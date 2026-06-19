import { Question, ResultCategory } from "./types";

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What type of vehicle do you drive?",
    options: [
      { value: "SUV / crossover", label: "SUV / crossover", points: 3 },
      { value: "Sedan", label: "Sedan", points: 2 },
      { value: "Pickup truck", label: "Pickup truck", points: 2 },
      { value: "Minivan", label: "Minivan", points: 1 },
      { value: "Other", label: "Other", points: 1 },
    ],
  },
  {
    id: 2,
    text: "What year is your vehicle?",
    options: [
      { value: "2020 or newer", label: "2020 or newer", points: 4 },
      { value: "2016–2019", label: "2016–2019", points: 3 },
      { value: "2010–2015", label: "2010–2015", points: 2 },
      { value: "Older than 2010", label: "Older than 2010", points: 1 },
      { value: "Not sure", label: "Not sure", points: 1 },
    ],
  },
  {
    id: 3,
    text: "How often do you drive on GTA highways or longer routes?",
    options: [
      { value: "Several times per week", label: "Several times per week", points: 4 },
      { value: "Weekly", label: "Weekly", points: 3 },
      { value: "Monthly", label: "Monthly", points: 2 },
      { value: "Rarely", label: "Rarely", points: 1 },
    ],
  },
  {
    id: 4,
    text: "Do you take summer road trips, cottage trips, or family drives?",
    options: [
      { value: "Yes, often", label: "Yes, often", points: 4 },
      { value: "Sometimes", label: "Sometimes", points: 3 },
      { value: "Rarely", label: "Rarely", points: 2 },
      { value: "Not currently", label: "Not currently", points: 1 },
    ],
  },
  {
    id: 5,
    text: "Have you ever ignored or misunderstood a dashboard warning?",
    options: [
      { value: "Yes", label: "Yes", points: 4 },
      { value: "Maybe / not sure", label: "Maybe / not sure", points: 3 },
      { value: "No", label: "No", points: 2 },
    ],
  },
  {
    id: 6,
    text: "How important is vehicle data privacy to you?",
    options: [
      { value: "Extremely important", label: "Extremely important", points: 4 },
      { value: "Very important", label: "Very important", points: 3 },
      { value: "Somewhat important", label: "Somewhat important", points: 2 },
      { value: "I have not thought about it much", label: "I have not thought about it much", points: 1 },
    ],
  },
  {
    id: 7,
    text: "Would clearer vehicle explanations help you feel more confident before longer drives?",
    options: [
      { value: "Yes", label: "Yes", points: 4 },
      { value: "Probably", label: "Probably", points: 3 },
      { value: "Not sure", label: "Not sure", points: 2 },
      { value: "No", label: "No", points: 1 },
    ],
  },
  {
    id: 8,
    text: "Would you be interested in founding cohort early access if your vehicle is eligible?",
    options: [
      { value: "Yes", label: "Yes", points: 4 },
      { value: "Maybe", label: "Maybe", points: 3 },
      { value: "I want to learn more first", label: "I want to learn more first", points: 2 },
      { value: "No", label: "No", points: 1 },
    ],
  },
];

export const VALUE_STRIP_ITEMS = [
  {
    id: "60-second",
    text: "60-second assessment",
  },
  {
    id: "gta-drivers",
    text: "Built for Canadian summer driving",
  },
  {
    id: "privacy-first",
    text: "Privacy-first vehicle intelligence",
  },
];

export const WHY_MATTERS_ITEMS = [
  {
    id: "longer-drives",
    title: "Longer Drives",
    description: "Cottage trips, highway routes, and weekend travel increase the need for better vehicle awareness.",
  },
  {
    id: "vehicle-signals",
    title: "Vehicle Signals",
    description: "Warning lights and diagnostics often lack context when drivers need clarity most.",
  },
  {
    id: "data-privacy",
    title: "Data Privacy",
    description: "Smarter vehicle technology should not require drivers to surrender control of their data.",
  },
];

export const TRUST_SECTION = {
  heading: "Built for pre-launch validation, not hype.",
  copy: "Astrateq Gadgets is currently validating market demand, driver interest, and vehicle compatibility signals before committing to broader hardware manufacturing. This readiness check helps us understand what Canadian drivers actually need from privacy-first vehicle intelligence.",
  bullets: [
    "No purchase required",
    "No payment collected on this page",
    "Hardware is not currently shipping",
    "Results are used to understand demand and compatibility interest",
    "Early participants may be invited toward founding cohort reservation",
  ],
};

export const PRIVACY_SECTION = {
  heading: "Privacy-first by design.",
  copy: "Astrateq is exploring vehicle intelligence that helps drivers understand their vehicles without unnecessary data exposure.",
  bullets: [
    "No third-party resale of submitted readiness answers",
    "Email used for readiness result and optional updates",
    "User-controlled early-access interest",
    "Built around data minimization principles",
  ],
};

export interface ResultDetails {
  category: ResultCategory;
  title: string;
  copy: string;
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta: {
    label: string;
    url: string;
  };
}

export const RESULT_STATES: Record<ResultCategory, ResultDetails> = {
  [ResultCategory.HIGH_READINESS]: {
    category: ResultCategory.HIGH_READINESS,
    title: "High Summer Readiness",
    copy: "Your driving profile appears strongly aligned with Astrateq’s pre-launch validation program. Your summer driving habits, interest in clearer vehicle signals, and privacy expectations suggest a strong fit for early vehicle intelligence exploration.",
    primaryCta: {
      label: "Join Founding Driver Cohort",
      url: "https://reserve.astrateqgadgets.com",
    },
    secondaryCta: {
      label: "Verify Vehicle Eligibility",
      url: "https://reserve.astrateqgadgets.com",
    },
  },
  [ResultCategory.MODERATE_READINESS]: {
    category: ResultCategory.MODERATE_READINESS,
    title: "Moderate Summer Readiness",
    copy: "Your vehicle and driving profile may benefit from clearer diagnostic context and smarter driver awareness, especially before longer summer drives. A compatibility review can help determine whether early access makes sense.",
    primaryCta: {
      label: "Verify Vehicle Eligibility",
      url: "https://reserve.astrateqgadgets.com",
    },
    secondaryCta: {
      label: "See How Astrateq Works",
      url: "#why-it-matters",
    },
  },
  [ResultCategory.NEEDS_REVIEW]: {
    category: ResultCategory.NEEDS_REVIEW,
    title: "Needs Compatibility Review",
    copy: "Your vehicle or driving profile may require additional review before early-access allocation. Astrateq is currently validating demand and compatibility patterns before manufacturing decisions are finalized.",
    primaryCta: {
      label: "Check Compatibility First",
      url: "https://reserve.astrateqgadgets.com",
    },
    secondaryCta: {
      label: "Join Product Updates",
      url: "https://join.astrateqgadgets.com",
    },
  },
};

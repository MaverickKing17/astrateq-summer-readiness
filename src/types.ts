export enum ResultCategory {
  HIGH_READINESS = 'HIGH_READINESS',
  MODERATE_READINESS = 'MODERATE_READINESS',
  NEEDS_REVIEW = 'NEEDS_REVIEW',
}

export interface Lead {
  id: string;
  email: string;
  vehicleType: string;
  vehicleYear: string;
  highwayDrivingFrequency: string;
  summerRoadTripFrequency: string;
  dashboardWarningFamiliarity: string;
  privacyConcernLevel: string;
  interestInEarlyAccess: string;
  resultCategory: ResultCategory;
  timestamp: string;
}

export interface QuestionOption {
  value: string;
  label: string;
  points: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

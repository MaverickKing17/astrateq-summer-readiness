# Astrateq Gadgets: Vehicle Intelligence Readiness Check

Welcome to the pre-launch validation platform for **Astrateq Gadgets**, a premium Canadian automotive technology brand exploring privacy-first vehicle intelligence, driver awareness, contextual diagnostics, and safer connected driving.

This application serves as a high-converting, mobile-first **interactive validation funnel** aimed at Toronto / GTA-area drivers preparing for summer trips.

---

## 🚀 Key Routes & Access Points

The application features self-contained routing designed specifically to preserve of marketing channels:

- **Gateway / Link-In-Bio (`/`)**: Designed to optimize traffic funneling from social handles (Instagram, X, LinkedIn). It houses brand pillars and points directly to the active validation campaign.
- **Summer Readiness Check (`/summer-readiness`)**: The main standalone lead magnet. A structured 60-second assessment for Canadian drivers, analyzing vehicles, driving frequencies, and warning familiarity.

---

## 🎨 Design Philosophy & Themes

Following the **Professional Polish** design direction, the application features an interface designed with:
- **Core Palette**: Deep obsidian midnight primary canvases paired with premium Indigo-600 accents (`#4F46E5` & `#6366F1`) and soft slate background elements.
- **Refined Typography**: "Space Grotesk" displays paired with crisp "Inter" sans-serif bodies and "JetBrains Mono" telemetry labels for clinical precision.
- **Authentic visuals**: OEM-neutral photorealistic representation features subtle cybernetic diagnostic light overlays of an anonymous crossover vehicle driving on a GTA-inspired summer road.

---

## 🛠️ Application Structure

```text
/
├── assets/                       # Asset bundles and gitignores
├── src/
│   ├── assets/
│   │   └── images/              # Premium non-branded photorealistic hero images
│   ├── components/
│   │   ├── Header.tsx           # Floating responsive navbar with back-navigation and status indicators
│   │   ├── Footer.tsx           # Institutional footer detailing social gateways and legal disclosures
│   │   ├── LinkInBio.tsx        # High-converting hub featuring Astrateq's core campaign callouts
│   │   ├── ValueStrip.tsx       # 3-point bullet strip detailing key validation metrics
│   │   ├── WhyMatters.tsx       # Visual grid cards highlighting summer vehicle signals
│   │   ├── Assessment.tsx        # Self-contained multi-step questionnaire & lead ledger database
│   │   ├── TrustPrivacy.tsx     # Double-panel trust section addressing transparency and data custody
│   │   └── SummerReadinessPage.tsx # Parent assembly wrapping the standalone campaign funnel
│   ├── App.tsx                  # Root component and query-resilient router
│   ├── data.ts                  # Centralized structured text copy databases (questions, options, etc.)
│   ├── types.ts                 # Declarative TypeScript contract interfaces (Leads, Categories)
│   ├── main.tsx                 # Web entry point mount
│   └── index.css                # Global styles and tailwind theme directives
```

---

## 📊 Core Captured Lead Ledger Schema

As part of the functional requirements, each completed assessment produces a structured state matching local standards, ready for remote pipeline synchronization:

```typescript
export interface Lead {
  id: string;                             // Random cryptographically formatted ID
  email: string;                          // Verified user email address
  vehicleType: string;                    // Matched option ("SUV / crossover", "Sedan", etc.)
  vehicleYear: string;                    // Release version ("2020 or newer", etc.)
  highwayDrivingFrequency: string;        // Route density frequency
  summerRoadTripFrequency: string;        // Long-distance cottage trips frequency
  dashboardWarningFamiliarity: string;    // Signal interpretation context
  privacyConcernLevel: string;            // Custody tolerance score
  interestInEarlyAccess: string;          // Direct founding cohort purchase/reservation alignment
  resultCategory: ResultCategory;         // HIGH_READINESS | MODERATE_READINESS | NEEDS_REVIEW
  timestamp: string;                      // ISO-8601 creation marker
}
```

---

## ⚙️ Development & Production Workflows

Ensure dependencies are resolved before starting the dev server:

### Installation
```bash
npm install
```

### Run Client-Side Preview
```bash
npm run dev
```

### Production Build Sequence
```bash
npm run build
```
This script acts as the single bundler pipeline, outputting assets into the `/dist` filesystem.

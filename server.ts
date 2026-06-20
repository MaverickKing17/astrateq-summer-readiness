import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

// Initialize Resend Client - Lazily verify API key presence
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ [RESEND] Warning: RESEND_API_KEY environment variable is missing.");
  }
  return new Resend(apiKey || "re_mock_key_for_compilation");
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request parser
  app.use(express.json());

  // API Route: Send Readiness Email
  app.post("/api/send-readiness-email", async (req, res) => {
    try {
      const { email, vehicleType, readinessScore, resultCategory } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: "Email coordinate is required."
        });
      }

      console.log(`✉️ Sending readiness evaluation to Resend for user: ${email}`);

      const resend = getResendClient();
      
      // Determine user readiness description for the email body
      const scoreNum = Number(readinessScore) || 50;
      let scoreReviewLabel = "Optimized / Calibrated";
      let statusColor = "#06b6d4"; // cyan-500
      let recommendation = "Your vehicle and driver profiles align ideally with northern summer parameters.";

      if (scoreNum >= 80) {
        scoreReviewLabel = "High / Stable Status";
        statusColor = "#10b981"; // emerald-500
        recommendation = "Excellent results! Your thermal exposure, local highway navigation, and data telemetry boundaries are fully optimized for summer driving conditions.";
      } else if (scoreNum < 50) {
        scoreReviewLabel = "Action Suggested";
        statusColor = "#f59e0b"; // amber-500
        recommendation = "Some areas demand calibration. Keep an eye on thermal warnings, decrease continuous high-velocity runs, and ensure your cabin data boundaries are insulated.";
      }

      // High-end, premium editorial HTML design that aligns with Astrateq Gadgets visual identity
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Astrateq Gadgets - Summer Readiness Verification</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #020617;
              color: #f8fafc;
              margin: 0;
              padding: 0;
            }
            .wrapper {
              background-color: #020617;
              width: 100%;
              padding: 40px 20px;
              box-sizing: border-box;
            }
            .container {
              max-width: 580px;
              margin: 0 auto;
              background-color: #0b1329;
              border: 1px solid #1e293b;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .header {
              padding: 40px 30px 20px 30px;
              text-align: center;
              border-bottom: 1px solid #1e293b;
            }
            .brand-badge {
              display: inline-block;
              background: rgba(6, 182, 212, 0.1);
              border: 1px solid rgba(6, 182, 212, 0.3);
              color: #06b6d4;
              font-size: 11px;
              font-family: monospace;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 2px;
              padding: 4px 12px;
              border-radius: 20px;
              margin-bottom: 15px;
            }
            .logo {
              font-size: 24px;
              font-weight: 900;
              letter-spacing: -0.5px;
              color: #ffffff;
              margin: 0 0 5px 0;
            }
            .logo span {
              color: #06b6d4;
            }
            .subtitle {
              color: #94a3b8;
              font-size: 14px;
              margin: 0;
              font-weight: 500;
            }
            .content {
              padding: 40px 30px;
              text-align: left;
            }
            .greeting {
              font-size: 18px;
              font-weight: 700;
              margin-top: 0;
              margin-bottom: 20px;
              color: #ffffff;
            }
            .score-card {
              background-color: #020617;
              border: 1px solid #1e293b;
              border-radius: 12px;
              padding: 25px;
              text-align: center;
              margin: 25px 0;
              position: relative;
            }
            .score-label {
              font-size: 10px;
              font-family: monospace;
              letter-spacing: 2px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .score-val {
              font-size: 48px;
              font-weight: 900;
              color: #06b6d4;
              line-height: 1;
              margin: 5px 0;
            }
            .score-category {
              font-size: 14px;
              font-weight: 700;
              color: #ffffff;
              margin-top: 5px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .details-grid {
              margin: 25px 0;
              border-top: 1px solid #1e293b;
              border-bottom: 1px solid #1e293b;
              padding: 15px 0;
            }
            .grid-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              font-size: 13px;
            }
            .grid-label {
              color: #94a3b8;
              font-weight: 500;
            }
            .grid-val {
              color: #ffffff;
              font-weight: 700;
              font-family: monospace;
            }
            .recommendation-box {
              background: rgba(30, 41, 59, 0.5);
              border-left: 3px solid #06b6d4;
              padding: 15px 20px;
              border-radius: 0 8px 8px 0;
              font-size: 13px;
              line-height: 1.6;
              color: #cbd5e1;
              margin: 25px 0;
            }
            .cta-btn {
              display: block;
              text-align: center;
              background-color: #ffffff;
              color: #020617;
              text-decoration: none;
              font-weight: 800;
              font-size: 14px;
              padding: 16px 20px;
              border-radius: 12px;
              margin: 30px 0 15px 0;
              transition: all 0.2s ease;
            }
            .footer {
              padding: 25px 30px;
              text-align: center;
              color: #475569;
              font-size: 11px;
              border-top: 1px solid #1e293b;
              line-height: 1.5;
            }
            .footer a {
              color: #64748b;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              
              <!-- Header -->
              <div class="header">
                <div class="brand-badge">CANADA SUMMER 2026 ACTIVE</div>
                <h1 class="logo">Astrateq<span>.</span></h1>
                <p class="subtitle">Summer Vehicle Intelligence Readiness Report</p>
              </div>

              <!-- Content -->
              <div class="content">
                <p class="greeting">Diagnostic Evaluation Complete</p>
                <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0;">
                  Thank you for completing the Astrateq pre-launch validation assessment. Our system has compiled your summer driving readiness parameters to evaluate hardware deployment queues and early cohort placement.
                </p>

                <!-- Score Callout -->
                <div class="score-card">
                  <div class="score-label">READINESS COEFFICIENT</div>
                  <div class="score-val" style="color: ${statusColor};">${scoreNum}%</div>
                  <div class="score-category">${scoreReviewLabel}</div>
                </div>

                <!-- Recommendation -->
                <div class="recommendation-box" style="border-left-color: ${statusColor};">
                  <strong style="color: #ffffff; display: block; margin-bottom: 5px;">ASTRATEQ DIAGNOSTIC RECOMMENDATION</strong>
                  ${recommendation}
                </div>

                <!-- Details Grid -->
                <div class="details-grid">
                  <div class="grid-row">
                    <span class="grid-label">Vehicle Driving Profile</span>
                    <span class="grid-val">${vehicleType}</span>
                  </div>
                  <div class="grid-row">
                    <span class="grid-label">Validation Status Log</span>
                    <span class="grid-val" style="color: #10b981;">VERIFIED</span>
                  </div>
                  <div class="grid-row">
                    <span class="grid-label">Cohort Eligibility Priority</span>
                    <span class="grid-val">EARLY ACCESS TIER 1</span>
                  </div>
                  <div class="grid-row">
                    <span class="grid-label">Time of Seal</span>
                    <span class="grid-val">${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })} EST</span>
                  </div>
                </div>

                <a href="${req.headers.origin || 'https://astrateq.ca'}/?page=summer-readiness" class="cta-btn">
                  Manage Cohort Reservation
                </a>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p>© 2026 Astrateq Gadgets. Built & operated under Canadian pre-launch market validation initiatives.</p>
                <p style="margin-top: 10px;">This email contains confidential diagnostic telemetry intended solely for user validation records. Your mail is secured under standard privacy custody protocols.</p>
              </div>

            </div>
          </div>
        </body>
        </html>
      `;

      // Dispatch the email via Resend
      const { data, error } = await resend.emails.send({
        from: "Astrateq Gadgets <onboarding@resend.dev>",
        to: [email],
        subject: `Your Summer Vehicle Intelligence Score: ${scoreNum}% [Astrateq]`,
        html: htmlContent,
      });

      if (error) {
        console.error("❌ Resend API Error:", error);
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }

      console.log("✅ Email sent successfully via Resend. ID:", data?.id);
      return res.json({
        success: true,
        id: data?.id
      });

    } catch (err: any) {
      console.error("💥 Server error sending readiness email:", err);
      return res.status(500).json({
        success: false,
        error: err.message || "A server-side anomaly occurred during email pipeline transit."
      });
    }
  });

  // Vite middleware for development asset pipeline
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("💻 Dev: Vite middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("📦 Prod: Static asset server mounted successfully.");
  }

  // Bind exclusively to Port 3000 to enable reverse proxy routing inside the cloud container
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Full-Stack Server running and ready on port ${PORT}`);
  });
}

startServer();

import React from "react";
import { Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate: (to: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white text-slate-700 py-12 sm:py-16 mt-auto border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-slate-950 text-lg tracking-tight">Astrateq Gadgets</h2>
            <p className="text-sm text-slate-700 max-w-sm leading-relaxed font-semibold">
              A pre-launch Canadian automotive technology brand exploring privacy-first vehicle intelligence, driver awareness, diagnostics, and smarter driving decisions.
            </p>
            <p className="text-xs font-mono text-slate-950 font-black tracking-wider uppercase">DRIVE SAFER. DRIVE SMARTER.</p>
          </div>

          {/* Useful Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-slate-950 text-sm uppercase tracking-wider">Pre-Launch Navigator</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("/")}
                  className="hover:text-slate-950 transition-colors duration-200 cursor-pointer text-left font-display font-bold text-slate-800"
                >
                  Brand Gateway
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/summer-readiness")}
                  className="hover:text-slate-950 transition-colors duration-200 cursor-pointer text-left font-display font-bold text-slate-800"
                >
                  Summer 2026 Driver Readiness Check
                </button>
              </li>
              <li>
                <a
                  href="https://reserve.astrateqgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 transition-colors duration-200 font-display font-bold text-slate-800"
                >
                  Pre-Launch Foundry Coalition
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Compliance Disclaimer */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-slate-950 text-sm uppercase tracking-wider">Social Channels</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/astrateq24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/70 border border-slate-200 flex items-center justify-center hover:bg-white text-slate-800 hover:text-slate-950 transition-all duration-300 shadow-sm"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/AstrateqIQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/70 border border-slate-200 flex items-center justify-center hover:bg-white text-slate-800 hover:text-slate-950 transition-all duration-300 font-display font-bold text-lg shadow-sm"
                title="X (Twitter)"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com/company/astrateq-gadgets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/70 border border-slate-200 flex items-center justify-center hover:bg-white text-slate-800 hover:text-slate-950 transition-all duration-300 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-200 font-semibold font-sans">
              Designed for Toronto, GTA & Canadian driving contexts. Storing user-consented analytics and diagnostics locally.
            </div>
          </div>
        </div>

        {/* Closing credits */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-4 font-semibold">
          <div>
            &copy; {new Date().getFullYear()} Astrateq Gadgets. Built under Canada pre-launch market validation initiatives.
          </div>
          <div>
            Privacy-First Security • Not Live For Retail Distribution
          </div>
        </div>
      </div>
    </footer>
  );
}

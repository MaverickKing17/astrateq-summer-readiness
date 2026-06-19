/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LinkInBio from "./components/LinkInBio";
import SummerReadinessPage from "./components/SummerReadinessPage";

export default function App() {
  // Client-side resilient routing state
  const [path, setPath] = useState("/");

  useEffect(() => {
    // Determine initial route using both pathname and query search parameter fallback for deployment safety
    const determineRoute = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page");
      
      if (pageParam === "summer-readiness" || pageParam === "readiness") {
        return "/summer-readiness";
      }

      const currentPath = window.location.pathname;
      if (currentPath.includes("/summer-readiness") || currentPath.includes("/readiness")) {
        return "/summer-readiness";
      }
      
      return "/";
    };

    setPath(determineRoute());

    // Listen for navigation changes
    const handlePopState = () => {
      setPath(determineRoute());
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Soft custom router trigger
  const navigateTo = (to: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Maintain clean paths
    if (to === "/summer-readiness") {
      searchParams.set("page", "summer-readiness");
      window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
    } else {
      searchParams.delete("page");
      const emptyParams = searchParams.toString();
      const newUrl = emptyParams ? `${window.location.pathname}?${emptyParams}` : window.location.pathname;
      window.history.pushState({}, "", newUrl);
    }
    
    setPath(to);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-brand-cyan/30 selection:text-slate-900">
      {/* Header element present across views */}
      <Header currentPath={path} onNavigate={navigateTo} />

      {/* Main Content Layout Container */}
      <main className="flex-grow">
        {path === "/summer-readiness" ? (
          <SummerReadinessPage />
        ) : (
          <LinkInBio onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer across all views */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const { id } = useParams();
  const [results, setResults] = useState<any>(null);
  const [active, setActive] = useState("accounts");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/results?id=${id}`);
      const data = await res.json();
      setResults(data.results);
    }
    load();
  }, [id]);

  if (!results) {
    return <div className="center">Loading scan results...</div>;
  }

  return (
    <div className="trinity-wrapper">

      <div className="trinity-sidebar">

        <div 
          className={`side-item ${active==="accounts" ? "active" : ""}`}
          onClick={() => setActive("accounts")}
        >
          Roblox Accounts
        </div>

        <div 
          className={`side-item ${active==="security" ? "active" : ""}`}
          onClick={() => setActive("security")}
        >
          System Security
        </div>

        <div 
          className={`side-item ${active==="analysis" ? "active" : ""}`}
          onClick={() => setActive("analysis")}
        >
          System Analysis
        </div>

        <div 
          className={`side-item ${active==="details" ? "active" : ""}`}
          onClick={() => setActive("details")}
        >
          Additional Details
        </div>

      </div>

      <div className="trinity-main">

        {active === "accounts" && (
          <ResultCard title="Roblox Accounts">
            <p><strong>{results.robloxAccount?.username}</strong></p>
            <a href={results.robloxAccount?.profile} target="_blank">
              {results.robloxAccount?.profile}
            </a>
          </ResultCard>
        )}

        {active === "security" && (
          <>
            <ResultCard title="Roblox Logs (Flags)">
              <pre>{results.robloxLogs}</pre>
            </ResultCard>

            <ResultCard title="Factory Reset Information">
              <pre>{results.factoryReset}</pre>
            </ResultCard>

            <ResultCard title="Services">
              <pre>{results.services}</pre>
            </ResultCard>
          </>
        )}

        {active === "analysis" && (
          <>
            <ResultCard title="Cheat Scan">
              <pre>{results.cheatScan}</pre>
            </ResultCard>

            <ResultCard title="Advanced Scan">
              <pre>{results.advancedScan}</pre>
            </ResultCard>
          </>
        )}

        {active === "details" && (
          <ResultCard title="Unsigned Executables">
            <pre>{results.unsignedExecutables}</pre>
          </ResultCard>
        )}

      </div>
    </div>
  );
}

function ResultCard({ title, children }: any) {
  return (
    <div className="trinity-card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

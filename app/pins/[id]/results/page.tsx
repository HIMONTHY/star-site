"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Results = {
  robloxAccount?: {
    username: string;
    profile: string;
  };
  robloxLogs?: string;
  factoryReset?: string;
  services?: string;
  cheatScan?: string;
  advancedScan?: string;
  unsignedExecutables?: string;
};

export default function ResultsPage() {
  const { id } = useParams();
  const [results, setResults] = useState<Results | null>(null);
  const [active, setActive] = useState("accounts");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/results?id=${id}`);
      const data = await res.json();
      setResults(data.results || null);
    }
    load();
  }, [id]);

  if (!results) {
    return <div className="center">Loading scan results...</div>;
  }

  return (
    <div className="trinity-layout">

      {/* SIDEBAR */}
      <div className="trinity-sidebar">

        <button onClick={() => setActive("accounts")} className={active==="accounts" ? "active" : ""}>
          Roblox Accounts
        </button>

        <button onClick={() => setActive("security")} className={active==="security" ? "active" : ""}>
          System Security
        </button>

        <button onClick={() => setActive("analysis")} className={active==="analysis" ? "active" : ""}>
          System Analysis
        </button>

        <button onClick={() => setActive("details")} className={active==="details" ? "active" : ""}>
          Additional Details
        </button>

      </div>

      {/* CONTENT */}
      <div className="trinity-content">

        {active === "accounts" && (
          <Card title="Roblox Accounts">
            <p><b>{results.robloxAccount?.username}</b></p>
            <a href={results.robloxAccount?.profile} target="_blank">
              {results.robloxAccount?.profile}
            </a>
          </Card>
        )}

        {active === "security" && (
          <>
            <Card title="Roblox Logs (Flags)">
              <pre>{results.robloxLogs}</pre>
            </Card>

            <Card title="Factory Reset Information">
              <pre>{results.factoryReset}</pre>
            </Card>

            <Card title="Services">
              <pre>{results.services}</pre>
            </Card>
          </>
        )}

        {active === "analysis" && (
          <>
            <Card title="Cheat Scan">
              <pre>{results.cheatScan}</pre>
            </Card>

            <Card title="Advanced Scan">
              <pre>{results.advancedScan}</pre>
            </Card>
          </>
        )}

        {active === "details" && (
          <Card title="Unsigned Executables">
            <pre>{results.unsignedExecutables}</pre>
          </Card>
        )}

      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: any }) {
  return (
    <div className="trinity-panel">
      <h3>{title}</h3>
      <div className="panel-body">{children}</div>
    </div>
  );
}

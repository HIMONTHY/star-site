"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Results = {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/results?id=${id}`);
      const data = await res.json();
      setResults(data.results || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <Center text="Loading scan results..." />;
  if (!results) return <Center text="No results found." />;

  return (
    <div className="trinity-results">

      <h1>Scan Results</h1>

      <Card title="Roblox Logs" value={results.robloxLogs} />
      <Card title="Factory Reset" value={results.factoryReset} />
      <Card title="Services" value={results.services} />
      <Card title="Cheat Scan" value={results.cheatScan} />
      <Card title="Advanced Scan" value={results.advancedScan} />
      <Card title="Unsigned Executables" value={results.unsignedExecutables} />

    </div>
  );
}

function Card({ title, value }: { title: string; value?: string }) {
  const text = value || "No data";

  let status = "clean";
  if (text.toLowerCase().includes("match") || text.toLowerCase().includes("unsigned"))
    status = "warning";
  if (text.toLowerCase().includes("suspicious") || text.toLowerCase().includes("flag"))
    status = "danger";

  const icon =
    status === "clean" ? "✔" :
    status === "warning" ? "⚠" : "❌";

  return (
    <div className={`trinity-card ${status}`}>
      <div className="card-header">
        <span className="icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

function Center({ text }: { text: string }) {
  return (
    <div className="center">
      <h2>{text}</h2>
    </div>
  );
}

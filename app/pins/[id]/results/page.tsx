"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ResultsData = {
  robloxLogs?: string;
  factoryReset?: string;
  services?: string;
  cheatScan?: string;
  advancedScan?: string;
  unsignedExecutables?: string;
};

export default function ResultsPage() {
  const { id } = useParams();
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch(`/api/results?id=${id}`);
        const data = await res.json();
        setResults(data.results || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <div className="center">
        <h2>Loading Results...</h2>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="center">
        <h2>No results found.</h2>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h1>Scan Results</h1>

      <ResultCard title="Roblox Logs" value={results.robloxLogs} />
      <ResultCard title="Factory Reset" value={results.factoryReset} />
      <ResultCard title="Services" value={results.services} />
      <ResultCard title="Cheat Scan" value={results.cheatScan} />
      <ResultCard title="Advanced Scan" value={results.advancedScan} />
      <ResultCard title="Unsigned Executables" value={results.unsignedExecutables} />
    </div>
  );
}

function ResultCard({ title, value }: { title: string; value?: string }) {
  return (
    <div className="result-card">
      <h3>{title}</h3>
      <p>{value || "No data"}</p>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function RunSimulationButton() {
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);

    try {
      const res = await fetch("/api/run/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenarioId: "d94c3e4f-0d33-4420-b67a-1b1c16bcc5c2",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "run failed");
      }

      alert("Run created: " + data.id);
      window.location.reload();
    } catch (err: any) {
      alert(err?.message || "Run failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRun}
      disabled={loading}
      style={{
        padding: "16px 24px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)",
        color: "#ffffff",
        fontWeight: 800,
        fontSize: "18px",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(34,211,238,0.18)",
      }}
    >
      {loading ? "Running simulation..." : "Run Simulation"}
    </button>
  );
}

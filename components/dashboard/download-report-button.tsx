"use client";

import { useState } from "react";

export default function DownloadReportButton({ runId }: { runId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ runId }),
      });

      if (!res.ok) {
        throw new Error("Report generation failed");
      }

      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `incident-report-${runId}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Report download failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.14)",
        cursor: "pointer",
        background: "rgba(255,255,255,0.03)",
        color: "#fff",
        fontWeight: 700,
        fontSize: "15px",
      }}
    >
      {loading ? "Preparing report..." : "Download Incident Report"}
    </button>
  );
}

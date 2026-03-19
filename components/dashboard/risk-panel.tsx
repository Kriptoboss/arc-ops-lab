"use client";

import { useEffect, useState } from "react";

type AIResult = {
  risk_score: number;
  risk_level: string;
  insight: string;
  recommendation: string;
} | null;

export default function RiskPanel({ runId }: { runId: string }) {
  const [analysis, setAnalysis] = useState<AIResult>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchAnalysis() {
      try {
        setLoading(true);
        setError("");

        const runRes = await fetch("/api/run", {
          cache: "no-store",
        });

        if (!runRes.ok) {
          throw new Error("Run list fetch failed");
        }

        const runs = await runRes.json();
        const run = Array.isArray(runs) ? runs.find((r: any) => r.id === runId) : null;

        if (!run) {
          throw new Error("Run not found");
        }

        const txs = Array.isArray(run.transactions) ? run.transactions : [];

        if (txs.length === 0) {
          throw new Error("No transactions found for this run");
        }

        const aiRes = await fetch("/api/ai/risk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactions: txs.map((tx: any) => ({
              to: tx.toAddress,
              amount: tx.amount,
              status: tx.status,
            })),
          }),
        });

        if (!aiRes.ok) {
          const text = await aiRes.text();
          throw new Error(text || "AI request failed");
        }

        const data = await aiRes.json();

        if (!cancelled) {
          setAnalysis(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "AI analysis failed");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAnalysis();

    return () => {
      cancelled = true;
    };
  }, [runId]);

  function levelColor(level?: string) {
    if (level === "HIGH") return "#ef4444";
    if (level === "MEDIUM") return "#facc15";
    if (level === "LOW") return "#22c55e";
    return "#7dd3fc";
  }

  return (
    <div
      style={{
        marginTop: "18px",
        padding: "18px",
        borderRadius: "16px",
        background: "rgba(56,189,248,0.05)",
        border: "1px solid rgba(56,189,248,0.18)",
      }}
    >
      <div style={{ color: "#7dd3fc", fontWeight: 700, marginBottom: "12px" }}>
        AI Risk Analysis
      </div>

      {loading && (
        <div style={{ color: "#94a3b8", fontSize: "14px" }}>
          Analyzing transactions...
        </div>
      )}

      {!loading && error && (
        <div style={{ color: "#fca5a5", fontSize: "14px", whiteSpace: "pre-wrap" }}>
          {error}
        </div>
      )}

      {!loading && !error && analysis && (
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "18px",
              marginBottom: "10px",
              color: levelColor(analysis.risk_level),
            }}
          >
            Risk Score: {analysis.risk_score} ({analysis.risk_level})
          </div>

          <div
            style={{
              color: "#e2e8f0",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "10px",
            }}
          >
            <strong>Insight:</strong> {analysis.insight}
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            <strong>Recommendation:</strong> {analysis.recommendation}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import RunSimulationButton from "@/components/dashboard/run-simulation-button";
import DownloadReportButton from "@/components/dashboard/download-report-button";
import RiskPanel from "@/components/dashboard/risk-panel";
import TxTimeline from "@/components/dashboard/tx-timeline";

export default function Home() {
  const [runs, setRuns] = useState<any[]>([]);

  async function fetchRuns() {
    try {
      const res = await fetch("/api/run");
      const data = await res.json();
      setRuns(Array.isArray(data) ? data : []);
    } catch {
      setRuns([]);
    }
  }

  useEffect(() => {
    fetchRuns();
  }, []);

  const stats = useMemo(() => {
    const totalRuns = runs.length;
    const completedRuns = runs.filter((r) => r.status === "completed").length;
    const totalTransactions = runs.reduce(
      (sum, run) => sum + (run.transactions?.length || 0),
      0
    );
    const highRiskRuns = runs.filter((r) => {
      const level =
        r.aiRisk?.risk_level ||
        r.riskLevel ||
        "";
      return String(level).toUpperCase() === "HIGH";
    }).length;

    return {
      totalRuns,
      completedRuns,
      totalTransactions,
      highRiskRuns,
    };
  }, [runs]);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background:
          "radial-gradient(circle at top left, rgba(37,99,235,0.20), transparent 30%), radial-gradient(circle at top right, rgba(99,102,241,0.16), transparent 25%), linear-gradient(180deg, #020617 0%, #081225 55%, #020617 100%)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "24px",
            alignItems: "stretch",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "24px",
              padding: "36px",
              background: "linear-gradient(135deg, rgba(15,23,42,0.88), rgba(17,24,39,0.75))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 25%), radial-gradient(circle at 80% 10%, rgba(129,140,248,0.16), transparent 22%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "760px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(56,189,248,0.10)",
                  border: "1px solid rgba(56,189,248,0.20)",
                  color: "#7dd3fc",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  marginBottom: "18px",
                }}
              >
                AI-NATIVE TREASURY INCIDENT COCKPIT
              </div>

              <h1
                style={{
                  fontSize: "56px",
                  lineHeight: 1.02,
                  margin: 0,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(to right, #e2e8f0, #7dd3fc 45%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Arc Ops Lab
              </h1>

              <p
                style={{
                  marginTop: "18px",
                  marginBottom: "0",
                  color: "#cbd5e1",
                  fontSize: "20px",
                  lineHeight: 1.6,
                  maxWidth: "720px",
                }}
              >
                Simulate treasury incidents, inspect attacker flows, analyze operational risk with AI,
                and export audit-ready reports for stablecoin infrastructure.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "28px",
                  marginBottom: "0",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#cbd5e1",
                    fontSize: "14px",
                  }}
                >
                  Simulate drain attacks
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#cbd5e1",
                    fontSize: "14px",
                  }}
                >
                  AI risk scoring
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#cbd5e1",
                    fontSize: "14px",
                  }}
                >
                  Audit-ready export
                </div>
              </div>

              <div style={{ marginTop: "30px" }}>
                <RunSimulationButton />
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "24px",
              padding: "28px",
              background: "linear-gradient(180deg, rgba(15,23,42,0.82), rgba(10,15,30,0.86))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100%",
            }}
          >
            <div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                SYSTEM OVERVIEW
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  marginBottom: "12px",
                  color: "#e2e8f0",
                }}
              >
                Monitor treasury attack paths before they become incidents.
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  lineHeight: 1.7,
                  fontSize: "15px",
                }}
              >
                Built for scenario-driven testing of treasury operations on Arc. Inspect transaction flow,
                quantify risk, and generate structured incident reports from a single operator dashboard.
              </div>
            </div>

            <div
              style={{
                marginTop: "28px",
                padding: "18px",
                borderRadius: "18px",
                background: "rgba(56,189,248,0.06)",
                border: "1px solid rgba(56,189,248,0.16)",
              }}
            >
              <div
                style={{
                  color: "#7dd3fc",
                  fontWeight: 700,
                  marginBottom: "8px",
                  fontSize: "14px",
                }}
              >
                CURRENT MODE
              </div>
              <div
                style={{
                  color: "#e2e8f0",
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                AI-powered incident simulation
              </div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                Simulate attack sequences, inspect outputs, and enrich each run with AI recommendations.
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "34px",
          }}
        >
          <StatCard label="Total Runs" value={stats.totalRuns} accent="#38bdf8" />
          <StatCard label="Completed Runs" value={stats.completedRuns} accent="#22c55e" />
          <StatCard label="Transactions Simulated" value={stats.totalTransactions} accent="#a78bfa" />
          <StatCard label="High Risk Runs" value={stats.highRiskRuns} accent="#ef4444" />
        </section>

        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                RUN COCKPIT
              </div>
              <h2
                style={{
                  color: "#e2e8f0",
                  fontSize: "30px",
                  margin: 0,
                  fontWeight: 800,
                }}
              >
                Incident Runs
              </h2>
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              Showing latest simulated treasury events
            </div>
          </div>

          {runs.length === 0 && (
            <div
              style={{
                color: "#94a3b8",
                padding: "24px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              No runs yet.
            </div>
          )}

          {runs.map((run) => (
            <div
              key={run.id}
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "22px",
                padding: "24px",
                marginBottom: "22px",
                boxShadow: "0 18px 45px rgba(0,0,0,0.26)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "12px",
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    RUN ID
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "#f8fafc",
                      letterSpacing: "-0.03em",
                      wordBreak: "break-word",
                    }}
                  >
                    {run.id}
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "999px",
                    background:
                      run.status === "completed"
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(250,204,21,0.12)",
                    color: run.status === "completed" ? "#22c55e" : "#facc15",
                    fontWeight: 800,
                    fontSize: "14px",
                    border:
                      run.status === "completed"
                        ? "1px solid rgba(34,197,94,0.18)"
                        : "1px solid rgba(250,204,21,0.18)",
                  }}
                >
                  {run.status}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginBottom: "18px",
                }}
              >
                <MiniPill label={`Transactions: ${run.transactions?.length || 0}`} />
                <MiniPill label={`Scenario: ${run.scenario?.name || "Unknown"}`} />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <DownloadReportButton runId={run.id} />
              </div>

              <RiskPanel runId={run.id} />

              <TxTimeline txs={run.transactions} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div
      style={{
        borderRadius: "18px",
        padding: "20px",
        background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 14px 35px rgba(0,0,0,0.24)",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          marginBottom: "10px",
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "34px",
          fontWeight: 800,
          color: accent,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniPill({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        padding: "10px 14px",
        borderRadius: "12px",
        color: "#cbd5e1",
        fontSize: "14px",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {label}
    </div>
  );
}

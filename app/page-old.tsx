export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      padding: "60px 20px",
      fontFamily: "sans-serif"
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        <h1 style={{
          fontSize: "48px",
          fontWeight: "800",
          marginBottom: "20px",
          background: "linear-gradient(to right,#38bdf8,#6366f1)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          AI Treasury Security Layer
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#94a3b8",
          marginBottom: "40px"
        }}>
          Detect suspicious treasury flows before they become incidents.  
          Simulate attacks, analyze risk, and generate AI-powered reports.
        </p>

        <div style={{ display: "flex", gap: "20px", marginBottom: "60px" }}>
          <a href="/dashboard" style={{
            padding: "14px 24px",
            borderRadius: "12px",
            background: "linear-gradient(to right,#38bdf8,#6366f1)",
            color: "white",
            fontWeight: "600",
            textDecoration: "none"
          }}>
            Launch Demo
          </a>

          <a href="https://github.com" target="_blank" style={{
            padding: "14px 24px",
            borderRadius: "12px",
            border: "1px solid #334155",
            color: "#94a3b8",
            textDecoration: "none"
          }}>
            View GitHub
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          
          <div style={{ background:"#0f172a", padding:20, borderRadius:16 }}>
            <h3>Attack Simulation</h3>
            <p style={{ color:"#94a3b8" }}>
              Simulate treasury drain scenarios with realistic flows.
            </p>
          </div>

          <div style={{ background:"#0f172a", padding:20, borderRadius:16 }}>
            <h3>AI Risk Scoring</h3>
            <p style={{ color:"#94a3b8" }}>
              Get instant risk insights powered by AI analysis.
            </p>
          </div>

          <div style={{ background:"#0f172a", padding:20, borderRadius:16 }}>
            <h3>Audit Reports</h3>
            <p style={{ color:"#94a3b8" }}>
              Export structured reports for compliance and review.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

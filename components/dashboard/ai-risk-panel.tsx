type AnalysisProps = {
  riskScore: number;
  severity: string;
  threatType: string;
  summary: string;
  recommendation: string;
  signals: {
    transactionCount: number;
    uniqueRecipients: number;
    largeTransfers: number;
    totalAmount: number;
  };
};

export default function AiRiskPanel({ analysis }: { analysis: AnalysisProps }) {
  const severityColor =
    analysis.severity === "critical"
      ? "#ff4d4f"
      : analysis.severity === "high"
      ? "#fa8c16"
      : analysis.severity === "medium"
      ? "#fadb14"
      : "#52c41a";

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "24px",
        background: "#0f0f0f",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "16px" }}>
        AI Risk Analysis
      </h2>

      <div style={{ display: "grid", gap: "10px" }}>
        <div>
          <strong>Risk Score:</strong> {analysis.riskScore}
        </div>

        <div>
          <strong>Severity:</strong>{" "}
          <span style={{ color: severityColor, fontWeight: "bold", textTransform: "uppercase" }}>
            {analysis.severity}
          </span>
        </div>

        <div>
          <strong>Threat Type:</strong> {analysis.threatType}
        </div>

        <div>
          <strong>Summary:</strong> {analysis.summary}
        </div>

        <div>
          <strong>Recommendation:</strong> {analysis.recommendation}
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          paddingTop: "16px",
          borderTop: "1px solid #222",
          display: "grid",
          gap: "8px",
        }}
      >
        <div><strong>Transaction Count:</strong> {analysis.signals.transactionCount}</div>
        <div><strong>Unique Recipients:</strong> {analysis.signals.uniqueRecipients}</div>
        <div><strong>Large Transfers:</strong> {analysis.signals.largeTransfers}</div>
        <div><strong>Total Amount:</strong> {analysis.signals.totalAmount}</div>
      </div>
    </div>
  );
}

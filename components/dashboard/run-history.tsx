type RunItem = {
  id: string;
  status: string;
  createdAt: string;
  scenario?: {
    name?: string;
  };
  transactions?: Array<{
    id: string;
  }>;
};

export default function RunHistory({ runs }: { runs: RunItem[] }) {
  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "24px",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "16px" }}>
        Run History
      </h2>

      {runs.length === 0 ? (
        <p>No runs yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {runs.map((run) => (
            <div
              key={run.id}
              style={{
                border: "1px solid #444",
                borderRadius: "10px",
                padding: "14px",
                background: "#0f0f0f",
              }}
            >
              <div><strong>Run ID:</strong> {run.id}</div>
              <div><strong>Scenario:</strong> {run.scenario?.name || "Unknown"}</div>
              <div><strong>Status:</strong> {run.status}</div>
              <div><strong>Transactions:</strong> {run.transactions?.length || 0}</div>
              <div><strong>Created:</strong> {new Date(run.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

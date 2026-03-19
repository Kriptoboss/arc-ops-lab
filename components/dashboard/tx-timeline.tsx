"use client";

export default function TxTimeline({ txs }: { txs: any[] }) {
  if (!txs || txs.length === 0) return null;

  return (
    <div style={{ marginTop: "18px" }}>
      <div
        style={{
          marginBottom: "12px",
          color: "#94a3b8",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        ATTACK TIMELINE
      </div>

      <div
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        {txs.map((tx, i) => (
          <div
            key={tx.id}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              background: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.16)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ color: "#fecaca", fontWeight: 700 }}>
              TX{i + 1} → {tx.toAddress}
            </div>

            <div
              style={{
                color: "#fca5a5",
                fontWeight: 800,
              }}
            >
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

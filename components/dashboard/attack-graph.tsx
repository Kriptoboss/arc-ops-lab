type Transaction = {
  id: string;
  toAddress: string;
  amount: number;
  status: string;
};

type Props = {
  transactions: Transaction[];
};

export default function AttackGraph({ transactions }: Props) {
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
        Attack Graph
      </h2>

      <div
        style={{
          border: "1px solid #444",
          borderRadius: "10px",
          padding: "16px",
          marginBottom: "16px",
          background: "#111",
        }}
      >
        <strong>Treasury Wallet</strong>
      </div>

      <div style={{ display: "grid", gap: "12px", marginLeft: "24px" }}>
        {transactions.map((tx, index) => (
          <div
            key={tx.id}
            style={{
              borderLeft: "2px solid #666",
              paddingLeft: "16px",
            }}
          >
            <div
              style={{
                border: "1px solid #444",
                borderRadius: "10px",
                padding: "14px",
                background: "#0f0f0f",
              }}
            >
              <div><strong>Target:</strong> {tx.toAddress}</div>
              <div><strong>Amount:</strong> {tx.amount}</div>
              <div><strong>Status:</strong> {tx.status}</div>
              <div><strong>Step:</strong> {index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

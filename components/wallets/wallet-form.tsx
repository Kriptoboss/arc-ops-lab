"use client";

import { useState } from "react";

export default function WalletForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          role,
        }),
      });

      if (!res.ok) {
        throw new Error("wallet create failed");
      }

      setName("");
      setAddress("");
      setRole("");
      window.location.reload();
    } catch (err) {
      alert("Wallet creation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        display: "grid",
        gap: "12px",
        maxWidth: "420px",
      }}
    >
      <input
        placeholder="Wallet name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #444" }}
      />

      <input
        placeholder="Wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #444" }}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #444" }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #444",
          cursor: "pointer",
        }}
      >
        {loading ? "Creating..." : "Add wallet"}
      </button>
    </form>
  );
}

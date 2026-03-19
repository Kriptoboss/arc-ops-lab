import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function analyzeTransactions(transactions: Array<{ amount: number; toAddress: string }>) {
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const uniqueRecipients = new Set(transactions.map((tx) => tx.toAddress)).size;
  const largeTransfers = transactions.filter((tx) => tx.amount >= 250).length;

  let riskScore = 20;
  let severity = "low";
  let threatType = "normal activity";
  let summary = "Run appears within expected operational behavior.";
  let recommendation = "Continue monitoring.";

  if (transactions.length >= 3) riskScore += 20;
  if (uniqueRecipients >= 3) riskScore += 20;
  if (largeTransfers >= 2) riskScore += 25;
  if (totalAmount >= 500) riskScore += 25;

  if (riskScore >= 80) {
    severity = "critical";
    threatType = "treasury drain attack";
    summary =
      "The run shows a high-risk pattern consistent with coordinated treasury drain behavior: multiple outbound transfers, multiple recipient addresses, and elevated total outflow.";
    recommendation =
      "Immediately pause treasury operations, review signer activity, isolate affected wallets, and escalate incident response.";
  } else if (riskScore >= 60) {
    severity = "high";
    threatType = "suspicious treasury outflow";
    summary =
      "The run contains suspicious multi-transfer behavior that may indicate unauthorized or abnormal treasury movement.";
    recommendation =
      "Review the scenario, verify approvals, and require manual confirmation before any live execution.";
  } else if (riskScore >= 40) {
    severity = "medium";
    threatType = "elevated operational risk";
    summary =
      "The run includes patterns that deserve attention, though not enough to classify as a critical drain event.";
    recommendation =
      "Inspect recipient addresses and compare against approved treasury workflows.";
  }

  return {
    riskScore,
    severity,
    threatType,
    summary,
    recommendation,
    signals: {
      transactionCount: transactions.length,
      uniqueRecipients,
      largeTransfers,
      totalAmount,
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const run = await db.run.findUnique({
      where: { id: body.runId },
      include: {
        scenario: true,
        transactions: true,
      },
    });

    if (!run) {
      return NextResponse.json({ error: "run not found" }, { status: 404 });
    }

    const analysis = analyzeTransactions(run.transactions);

    return NextResponse.json({
      runId: run.id,
      scenarioName: run.scenario.name,
      status: run.status,
      analysis,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "analysis failed" },
      { status: 500 }
    );
  }
}

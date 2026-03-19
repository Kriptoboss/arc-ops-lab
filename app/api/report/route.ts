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
      "The run shows a high-risk pattern consistent with coordinated treasury drain behavior.";
    recommendation =
      "Immediately pause treasury operations and escalate incident response.";
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
      totalAmount
    }
  };
}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const run = await db.run.findUnique({
      where: { id: body.runId },
      include: {
        scenario: true,
        transactions: true
      }
    });

    if (!run) {
      return NextResponse.json({ error: "run not found" }, { status: 404 });
    }

    const analysis = analyzeTransactions(run.transactions);

    const report = {
      reportType: "incident-report",
      generatedAt: new Date().toISOString(),

      run: {
        id: run.id,
        status: run.status,
        scenario: run.scenario.name
      },

      analysis,

      transactions: run.transactions.map(tx => ({
        id: tx.id,
        toAddress: tx.toAddress,
        amount: tx.amount,
        status: tx.status,
        createdAt: tx.createdAt
      }))
    };

    return NextResponse.json(report);

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message || "report generation failed" },
      { status: 500 }
    );

  }

}

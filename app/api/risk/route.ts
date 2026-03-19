import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const run = await db.run.findUnique({
      where: { id: body.runId },
    });

    if (!run) {
      return NextResponse.json({ error: "run not found" }, { status: 404 });
    }

    if (run.riskScore !== null && run.riskScore !== undefined) {
      return NextResponse.json({
        runId: run.id,
        riskScore: run.riskScore,
        level: run.riskLevel,
        summary:
          "Treasury shows vulnerability to repeated drain attempts and insufficient distribution controls.",
        recommendation:
          "Implement rate limiting, multi-sig approval, and anomaly detection on outgoing transfers.",
      });
    }

    const riskScore = Math.floor(Math.random() * 40) + 60;

    let level = "LOW";
    if (riskScore > 80) level = "HIGH";
    else if (riskScore > 70) level = "MEDIUM";

    await db.run.update({
      where: { id: run.id },
      data: {
        riskScore,
        riskLevel: level,
      },
    });

    return NextResponse.json({
      runId: run.id,
      riskScore,
      level,
      summary:
        "Treasury shows vulnerability to repeated drain attempts and insufficient distribution controls.",
      recommendation:
        "Implement rate limiting, multi-sig approval, and anomaly detection on outgoing transfers.",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "risk analysis failed" },
      { status: 500 }
    );
  }
}

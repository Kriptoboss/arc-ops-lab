import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const runs = await db.run.findMany({
      include: {
        scenario: true,
        transactions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(runs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "run list failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const run = await db.run.create({
      data: {
        scenarioId: body.scenarioId,
        status: "running",
      },
    });

    const tx1 = await db.transaction.create({
      data: {
        runId: run.id,
        toAddress: "0xATTACKER1",
        amount: 100,
        status: "simulated",
      },
    });

    const tx2 = await db.transaction.create({
      data: {
        runId: run.id,
        toAddress: "0xATTACKER2",
        amount: 250,
        status: "simulated",
      },
    });

    const tx3 = await db.transaction.create({
      data: {
        runId: run.id,
        toAddress: "0xATTACKER3",
        amount: 500,
        status: "simulated",
      },
    });

    await db.run.update({
      where: { id: run.id },
      data: { status: "completed" },
    });

    return NextResponse.json({
      runId: run.id,
      transactions: [tx1, tx2, tx3],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "run failed" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scenario = await db.scenario.findUnique({
      where: { id: body.scenarioId },
    });

    if (!scenario) {
      return NextResponse.json(
        { error: "scenario not found" },
        { status: 404 }
      );
    }

    const run = await db.run.create({
      data: {
        scenarioId: scenario.id,
        status: "completed",
      },
    });

    await db.transaction.createMany({
      data: [
        {
          runId: run.id,
          toAddress: "0xATTACKER1",
          amount: 100,
          status: "simulated",
        },
        {
          runId: run.id,
          toAddress: "0xATTACKER2",
          amount: 250,
          status: "simulated",
        },
        {
          runId: run.id,
          toAddress: "0xATTACKER3",
          amount: 500,
          status: "simulated",
        },
      ],
    });

    return NextResponse.json({
      id: run.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "run creation failed" },
      { status: 500 }
    );
  }
}

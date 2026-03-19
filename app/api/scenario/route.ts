import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const scenarios = await db.scenario.findMany({
      include: {
        wallet: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(scenarios);
  } catch (error: any) {
    console.error("SCENARIO_GET_ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "scenario list failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scenario = await db.scenario.create({
      data: {
        name: body.name,
        walletId: body.walletId,
      },
    });

    return NextResponse.json(scenario);
  } catch (error: any) {
    console.error("SCENARIO_POST_ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "scenario creation failed" },
      { status: 500 }
    );
  }
}

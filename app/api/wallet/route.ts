import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const wallets = await db.wallet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(wallets);
  } catch (error) {
    return NextResponse.json(
      { error: "wallet list failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const wallet = await db.wallet.create({
      data: {
        name: body.name,
        address: body.address,
        role: body.role,
        chain: "arc",
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    return NextResponse.json(
      { error: "wallet creation failed" },
      { status: 500 }
    );
  }
}

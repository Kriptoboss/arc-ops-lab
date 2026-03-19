import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { transactions } = await req.json();

    const prompt = `
You are a senior blockchain security analyst.

Analyze these transactions and return a risk assessment.

Transactions:
${JSON.stringify(transactions, null, 2)}

Return ONLY valid JSON in this format:
{
  "risk_score": number (0-100),
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "insight": string,
  "recommendation": string
}
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: "You are a blockchain security AI." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();

    const text =
      data.choices?.[0]?.message?.content || '{"error":"AI failed"}';

    return NextResponse.json(JSON.parse(text));
  } catch (e) {
    return NextResponse.json(
      { error: "AI processing failed" },
      { status: 500 }
    );
  }
}

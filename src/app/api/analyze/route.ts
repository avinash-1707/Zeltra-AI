import { analyzeIdeaChain } from "@/lib/chains/analyzeIdea";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { idea } = data;

    if (!idea) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to send data to LLM",
        },
        { status: 400 }
      );
    }

    const analysis = await analyzeIdeaChain(idea);

    return NextResponse.json({
      success: true,
      message: "Successfully contacted with AI",
      content: analysis,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}

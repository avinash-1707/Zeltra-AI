import { analyzeIdeaChain } from "@/lib/chains/analyzeIdea";
import { prisma } from "@/lib/prisma";
import { AnalyzeSchema } from "@/schemas/analyzeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionId, message } = AnalyzeSchema.parse(
      await req.json()
    );

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to send data to LLM",
        },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany();
    console.log(users);

    const analysis = await analyzeIdeaChain(message, sessionId);

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

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create new chat session for the user
    const newChat = await prisma.chatSession.create({
      data: {
        title: title,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      sessionId: newChat.id,
    });
  } catch (err) {
    console.error("Failed to create new chat session:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

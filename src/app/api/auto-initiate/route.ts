import { suggestChatName } from "@/lib/chains/chatName";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { createNewChat } from "@/lib/services/chatServices";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message)
      return NextResponse.json({ message: "You need to send a message" });

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({
        message: "Please login to start talking to zeltra",
      });
    }

    const chatTitle = await suggestChatName(message);

    console.log(chatTitle);

    const res = await createNewChat({
      title: chatTitle,
      userId: session.user.id,
    });

    if (!res.sessionId) {
      return NextResponse.json(
        {
          message: "Something wrong with chat generation API",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sessionId: res.sessionId,
    });
  } catch (err) {
    console.error("Failed to create new chat session:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

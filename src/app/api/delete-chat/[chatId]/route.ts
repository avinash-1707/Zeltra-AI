import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;
  if (!chatId)
    return NextResponse.json(
      { error: "Chat Id is missing from the request" },
      { status: 400 }
    );
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedMessages = await prisma.message.deleteMany({
      where: { sessionId: chatId },
    });

    if (deletedMessages.count) {
      console.log("Messages deleted successfully");
    }

    const deletedSession = await prisma.chatSession.delete({
      where: { id: chatId },
    });

    if (deletedSession) {
      return NextResponse.json({
        message: "Chat session deleted successfully",
      });
    }

    return NextResponse.json({ message: "Failed to delete Chat session" });
  } catch (err) {
    console.error("Failed to create new chat session:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

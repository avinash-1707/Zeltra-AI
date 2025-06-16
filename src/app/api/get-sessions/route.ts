import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sessions = await prisma.chatSession.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 404 }
    );
  }
}

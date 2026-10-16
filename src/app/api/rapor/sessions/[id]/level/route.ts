import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getRaporSession, getSanitizedQuestionsForLevel } from "@/lib/rapor";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const session = getRaporSession(id);
    if (!session || session.userId !== user.id) {
      return NextResponse.json({ error: "Sesi tidak ditemukan" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const requestedLevel = searchParams.get("level")
      ? parseInt(searchParams.get("level")!, 10)
      : session.currentLevel;

    const questions = getSanitizedQuestionsForLevel(id, requestedLevel);

    return NextResponse.json({
      session_id: session.sessionId,
      level: requestedLevel,
      current_level: session.currentLevel,
      total_levels: session.totalLevels,
      is_finished: session.isFinished,
      questions,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal mengambil soal level" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getRaporSession, getRaporSessionAsync, submitRaporLevelAnswers } from "@/lib/rapor";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const session = getRaporSession(id) || (await getRaporSessionAsync(id));
    if (!session || session.userId !== user.id) {
      return NextResponse.json({ error: "Sesi tidak ditemukan" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const { level, answers } = body;

    if (!level || typeof level !== "number" || !answers || typeof answers !== "object" || Array.isArray(answers)) {
      return NextResponse.json({ error: "Data level dan answers tidak valid" }, { status: 400 });
    }

    const result = submitRaporLevelAnswers(id, level, answers);

    return NextResponse.json({
      session_id: id,
      level_submitted: level,
      next_level: result.nextLevel,
      is_finished: result.isFinished,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menyimpan jawaban" },
      { status: 400 }
    );
  }
}

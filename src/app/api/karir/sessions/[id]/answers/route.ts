import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { recordLevelAnswers, careerSessions, getCareerSessionAsync } from "@/lib/karir";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Harap masuk terlebih dahulu" } },
      { status: 401 }
    );
  }

  const { id } = await params;
  const session = careerSessions.get(id) || (await getCareerSessionAsync(id));

  if (!session || session.user_id !== user.id) {
    return NextResponse.json(
      { success: false, error: { message: "Sesi tidak ditemukan" } },
      { status: 404 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const answers = body.answers;

  // Schema & payload size validation (mencegah memory exhaustion)
  if (!Array.isArray(answers) || answers.length === 0 || answers.length > 20) {
    return NextResponse.json(
      { success: false, error: { message: "Daftar jawaban tidak valid (harus berupa array berisi 1–20 jawaban)" } },
      { status: 400 }
    );
  }

  // Validasi tipe item jawaban
  for (const item of answers) {
    if (!item.question_id || typeof item.question_id !== "string" || item.answer === undefined) {
      return NextResponse.json(
        { success: false, error: { message: "Setiap elemen jawaban wajib memiliki question_id dan nilai answer" } },
        { status: 400 }
      );
    }
  }

  try {
    recordLevelAnswers(id, answers);
    return NextResponse.json({
      success: true,
      data: {
        session_id: id,
        next_level: session.current_level,
        is_finished: session.current_level >= 4 && session.answers.size >= 20,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 400 }
    );
  }
}

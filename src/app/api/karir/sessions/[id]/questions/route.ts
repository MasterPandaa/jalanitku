import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getQuestionsForLevel, careerSessions, getCareerSessionAsync } from "@/lib/karir";

export async function GET(
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
      { success: false, error: { message: "Sesi JalanKarir tidak ditemukan" } },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(req.url);
  let requestedLevel = Number(searchParams.get("level")) || session.current_level;

  // Level guard: Cegah traversal/pre-fetching soal level di atas level aktif
  if (requestedLevel > session.current_level) {
    requestedLevel = session.current_level;
  }

  try {
    const questions = getQuestionsForLevel(id, requestedLevel);
    const answersObj: Record<string, number | string> = {};
    if (session.answers) {
      for (const q of questions) {
        const recorded = session.answers.get(q.id);
        if (recorded) {
          answersObj[q.id] = recorded.value;
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        session_id: id,
        current_level: session.current_level,
        level: requestedLevel,
        total_levels: 4,
        questions,
        answers: answersObj,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 400 }
    );
  }
}

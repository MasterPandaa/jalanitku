import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
  startCareerSession,
  getUserJalanID,
  getUserJalanIDAsync,
  getActiveCareerSession,
  getActiveCareerSessionAsync,
} from "@/lib/karir";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Harap masuk terlebih dahulu" } },
      { status: 401 }
    );
  }

  const existingJalanId = getUserJalanID(user.id) || (await getUserJalanIDAsync(user.id));
  const activeSession = getActiveCareerSession(user.id) || (await getActiveCareerSessionAsync(user.id));

  if (!activeSession) {
    return NextResponse.json({
      success: true,
      data: {
        has_active_session: false,
        session: null,
        has_previous_result: Boolean(existingJalanId),
      },
    });
  }

  const answersObj: Record<string, number | string> = {};
  if (activeSession.answers) {
    for (const [qid, ans] of activeSession.answers.entries()) {
      answersObj[qid] = ans.value;
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      has_active_session: true,
      session: {
        id: activeSession.id,
        current_level: activeSession.current_level,
        total_levels: 4,
        answers: answersObj,
        created_at: activeSession.created_at,
      },
      has_previous_result: Boolean(existingJalanId),
    },
  });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Harap masuk terlebih dahulu" } },
      { status: 401 }
    );
  }

  if (!user.username) {
    return NextResponse.json(
      { success: false, error: { message: "Pilih username terlebih dahulu", redirect: "/onboarding" } },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const reset = Boolean(body.reset);

  const existingJalanId = getUserJalanID(user.id) || (await getUserJalanIDAsync(user.id));
  const activeSession = getActiveCareerSession(user.id) || (await getActiveCareerSessionAsync(user.id));

  // Jika tidak minta reset dan sudah ada sesi aktif, lanjutkan sesi yang ada
  if (activeSession && !reset) {
    const answersObj: Record<string, number | string> = {};
    if (activeSession.answers) {
      for (const [qid, ans] of activeSession.answers.entries()) {
        answersObj[qid] = ans.value;
      }
    }
    return NextResponse.json({
      success: true,
      data: {
        session_id: activeSession.id,
        level: activeSession.current_level,
        total_levels: 4,
        is_resumed: true,
        answers: answersObj,
        has_previous_result: Boolean(existingJalanId),
      },
    });
  }

  const session = startCareerSession(user.id);

  return NextResponse.json({
    success: true,
    data: {
      session_id: session.id,
      level: session.current_level,
      total_levels: 4,
      is_resumed: false,
      has_previous_result: Boolean(existingJalanId),
    },
  });
}

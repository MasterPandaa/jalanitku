import { NextRequest, NextResponse } from "next/server";
import { usersStore } from "@/lib/auth";
import { startCareerSession, getUserJalanID } from "@/lib/karir";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("jalanitku_session")?.value;

  if (!sessionId || !usersStore.has(sessionId)) {
    return NextResponse.json(
      { success: false, error: { message: "Harap masuk terlebih dahulu" } },
      { status: 401 }
    );
  }

  const user = usersStore.get(sessionId)!;
  if (!user.username) {
    return NextResponse.json(
      { success: false, error: { message: "Pilih username terlebih dahulu", redirect: "/onboarding" } },
      { status: 403 }
    );
  }

  const existingJalanId = getUserJalanID(user.id);
  const session = startCareerSession(user.id);

  return NextResponse.json({
    success: true,
    data: {
      session_id: session.id,
      level: session.current_level,
      total_levels: 5,
      has_previous_result: Boolean(existingJalanId),
    },
  });
}

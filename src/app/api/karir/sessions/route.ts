import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { startCareerSession, getUserJalanID, getUserJalanIDAsync } from "@/lib/karir";

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

  const existingJalanId = getUserJalanID(user.id) || (await getUserJalanIDAsync(user.id));
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

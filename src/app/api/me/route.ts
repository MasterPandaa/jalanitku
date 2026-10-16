import { NextRequest, NextResponse } from "next/server";
import { usersStore } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("jalanitku_session")?.value;

  if (!sessionId || !usersStore.has(sessionId)) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  const user = usersStore.get(sessionId)!;

  return NextResponse.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      has_jalan_id: Boolean(user.has_jalan_id),
      has_cocoklogiku: Boolean(user.has_cocoklogiku),
      active_role_slug: user.active_role_slug || null,
    },
  });
}

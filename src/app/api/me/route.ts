import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

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

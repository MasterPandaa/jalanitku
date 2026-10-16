import { NextRequest, NextResponse } from "next/server";
import { usersStore } from "@/lib/auth";
import { getUserJalanID } from "@/lib/karir";

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("jalanitku_session")?.value;

  if (!sessionId || !usersStore.has(sessionId)) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  const user = usersStore.get(sessionId)!;
  const jalanId = getUserJalanID(user.id);

  if (!jalanId) {
    return NextResponse.json({
      success: true,
      data: null,
      message: "Pengguna belum memiliki kartu JalanID aktif",
    });
  }

  return NextResponse.json({
    success: true,
    data: jalanId,
  });
}

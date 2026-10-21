import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getUserJalanID, getUserJalanIDAsync } from "@/lib/karir";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  let jalanId = getUserJalanID(user.id);
  if (!jalanId) {
    jalanId = (await getUserJalanIDAsync(user.id)) || undefined;
  }

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

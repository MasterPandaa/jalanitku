import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { calculateCareerResult, careerSessions, getCareerSessionAsync } from "@/lib/karir";

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

  if (!session.answers || session.answers.size === 0) {
    return NextResponse.json(
      { success: false, error: { message: "Tidak dapat menyelesaikan sesi: belum ada pertanyaan yang dijawab." } },
      { status: 400 }
    );
  }

  try {
    const result = calculateCareerResult(id);
    return NextResponse.json({
      success: true,
      data: result,
      message: "Hasil JalanID berhasil diterbitkan",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 400 }
    );
  }
}

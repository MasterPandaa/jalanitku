import { NextRequest, NextResponse } from "next/server";
import { usersStore } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  const sessionId = req.cookies.get("jalanitku_session")?.value;

  if (!sessionId || !usersStore.has(sessionId)) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  // Delete user from store
  usersStore.delete(sessionId);

  const response = NextResponse.json({
    success: true,
    message: "Akun dan semua data terkait berhasil dihapus.",
  });

  // Clear cookie
  response.cookies.delete("jalanitku_session");
  return response;
}

import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, usersStore } from "@/lib/auth";
import { deleteUserCocoklogiku, raporSessions } from "@/lib/rapor";
import { jalanIdsStore, careerSessions } from "@/lib/karir";
import { safeSupabaseSync } from "@/lib/supabase";

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  const userId = user.id;

  // 1. Hapus Cocoklogiku & Sesi Rapor
  deleteUserCocoklogiku(userId);
  for (const [sessId, sess] of raporSessions.entries()) {
    if (sess.userId === userId) {
      raporSessions.delete(sessId);
    }
  }

  // 2. Hapus JalanID & Sesi Karir
  jalanIdsStore.delete(userId);
  for (const [sessId, sess] of careerSessions.entries()) {
    if (sess.user_id === userId) {
      careerSessions.delete(sessId);
    }
  }

  // 3. Hapus data Supabase
  safeSupabaseSync("deleteUserData", async (client) => {
    await client.from("cocoklogikus").delete().eq("user_id", userId);
    await client.from("jalan_ids").delete().eq("user_id", userId);
    await client.from("career_sessions").delete().eq("user_id", userId);
    await client.from("rapor_sessions").delete().eq("user_id", userId);
    await client.from("users").delete().eq("id", userId);
  });

  // 4. Hapus user dari usersStore
  usersStore.delete(userId);

  const response = NextResponse.json({
    success: true,
    message: "Akun dan semua data terkait berhasil dihapus secara bersih.",
  });

  // Clear cookie
  response.cookies.delete("jalanitku_session");
  return response;
}

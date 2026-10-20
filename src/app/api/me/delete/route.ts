import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, usersStore } from "@/lib/auth";
import { deleteUserCocoklogiku } from "@/lib/rapor";
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

  // Hapus data terkait di Cocoklogiku & Supabase
  deleteUserCocoklogiku(userId);

  safeSupabaseSync("deleteUserData", async (client) => {
    await client.from("users").delete().eq("id", userId);
  });

  // Delete user from local store
  usersStore.delete(userId);

  const response = NextResponse.json({
    success: true,
    message: "Akun dan semua data terkait berhasil dihapus.",
  });

  // Clear cookie
  response.cookies.delete("jalanitku_session");
  return response;
}

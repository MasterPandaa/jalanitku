import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, saveUser } from "@/lib/auth";
import { getRaporSession, getRaporSessionAsync, finishRaporSession } from "@/lib/rapor";
import { getRoleBySlug } from "@/lib/roles";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const session = getRaporSession(id) || (await getRaporSessionAsync(id));
    if (!session || session.userId !== user.id) {
      return NextResponse.json({ error: "Sesi tidak ditemukan" }, { status: 404 });
    }

    const role = getRoleBySlug(session.roleSlug);
    const roleName = role ? role.nama.id : session.roleSlug;

    const username = user.username || "pengguna";
    const cocoklogiku = finishRaporSession(id, username, roleName);

    // Update session user di store & Supabase agar status dashboard sinkron
    user.has_cocoklogiku = true;
    user.active_role_slug = session.roleSlug;
    saveUser(user);

    return NextResponse.json({
      success: true,
      cocoklogiku,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menyelesaikan tes JalanRapor" },
      { status: 400 }
    );
  }
}

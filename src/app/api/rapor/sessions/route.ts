import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { startRaporSession, AVAILABLE_RAPOR_ROLES } from "@/lib/rapor";
import { getRoleBySlug } from "@/lib/roles";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role_slug } = body;

    if (!role_slug || typeof role_slug !== "string") {
      return NextResponse.json({ error: "Parameter role_slug wajib diisi." }, { status: 400 });
    }

    if (!AVAILABLE_RAPOR_ROLES.includes(role_slug)) {
      return NextResponse.json(
        { error: "Bank soal untuk role ini sedang dipersiapkan (Segera Hadir)." },
        { status: 400 }
      );
    }

    const role = getRoleBySlug(role_slug);
    if (!role) {
      return NextResponse.json({ error: "Role tidak ditemukan." }, { status: 404 });
    }

    const session = startRaporSession(user.id, role_slug);

    return NextResponse.json({
      session_id: session.sessionId,
      role_slug: session.roleSlug,
      role_name: role.nama.id,
      current_level: session.currentLevel,
      total_levels: session.totalLevels,
      started_at: session.startedAt,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal membuat sesi JalanRapor" }, { status: 500 });
  }
}

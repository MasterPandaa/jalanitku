import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getUserCocoklogiku, getUserCocoklogikuAsync } from "@/lib/rapor";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let cocoklogiku = getUserCocoklogiku(user.id);
    if (!cocoklogiku) {
      cocoklogiku = await getUserCocoklogikuAsync(user.id);
    }

    return NextResponse.json({ cocoklogiku });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal mengambil data Cocoklogiku" }, { status: 500 });
  }
}

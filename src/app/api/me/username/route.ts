import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, saveUser, validateUsername, checkUsernameAvailability } from "@/lib/auth";
import { jalanIdsStore } from "@/lib/karir";
import { cocoklogikuByUser } from "@/lib/rapor";

export async function POST(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const username = body.username;

  if (!username) {
    return NextResponse.json(
      { success: false, error: { message: "Username wajib diisi" } },
      { status: 400 }
    );
  }

  // Validate format
  const valResult = validateUsername(username);
  if (!valResult.valid) {
    return NextResponse.json(
      { success: false, error: { message: valResult.error } },
      { status: 400 }
    );
  }

  // Check uniqueness across local store and Supabase
  const isAvailable = await checkUsernameAvailability(username, user.id);
  if (!isAvailable) {
    return NextResponse.json(
      { success: false, error: { message: "Username sudah digunakan oleh orang lain." } },
      { status: 409 }
    );
  }

  // Update user username
  const cleanUsername = username.trim().toLowerCase();
  user.username = cleanUsername;
  saveUser(user);

  // Cascade update ke kartu JalanID jika ada
  const jalanId = jalanIdsStore.get(user.id);
  if (jalanId) {
    jalanId.username = cleanUsername;
    jalanIdsStore.set(user.id, jalanId);
  }

  // Cascade update ke kartu Cocoklogiku jika ada
  const cocoklogiku = cocoklogikuByUser.get(user.id);
  if (cocoklogiku) {
    cocoklogiku.username = cleanUsername;
    cocoklogikuByUser.set(user.id, cocoklogiku);
  }

  const response = NextResponse.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    },
    message: "Username berhasil disimpan",
  });

  response.cookies.delete("jalanitku_needs_onboarding");
  return response;
}

export async function PATCH(req: NextRequest) {
  return POST(req);
}

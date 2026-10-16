import { NextRequest, NextResponse } from "next/server";
import { usersStore, validateUsername, isUsernameAvailable } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("jalanitku_session")?.value;

  if (!sessionId || !usersStore.has(sessionId)) {
    return NextResponse.json(
      { success: false, error: { message: "Belum terautentikasi" } },
      { status: 401 }
    );
  }

  const user = usersStore.get(sessionId)!;
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

  // Check uniqueness
  if (!isUsernameAvailable(username, user.id)) {
    return NextResponse.json(
      { success: false, error: { message: "Username sudah digunakan oleh orang lain." } },
      { status: 409 }
    );
  }

  // Update user username
  user.username = username.trim().toLowerCase();
  usersStore.set(user.id, user);

  return NextResponse.json({
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
}

export async function PATCH(req: NextRequest) {
  return POST(req);
}

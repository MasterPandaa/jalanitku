import { NextRequest, NextResponse } from "next/server";
import { validateUsername, checkUsernameAvailability, getUserById, verifySessionId } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("jalanitku_session")?.value;
  let currentUserId: string | undefined = undefined;

  if (sessionToken) {
    const verifiedId = verifySessionId(sessionToken);
    if (verifiedId) {
      const user = await getUserById(verifiedId);
      if (user) {
        currentUserId = user.id;
      }
    }
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    return NextResponse.json({
      success: true,
      data: { available: false, message: "Ketik username yang ingin kamu gunakan" },
    });
  }

  const valResult = validateUsername(q);
  if (!valResult.valid) {
    return NextResponse.json({
      success: true,
      data: { available: false, message: valResult.error },
    });
  }

  const available = await checkUsernameAvailability(q, currentUserId);

  return NextResponse.json({
    success: true,
    data: {
      available,
      message: available ? "Username tersedia!" : "Username sudah digunakan oleh orang lain.",
    },
  });
}

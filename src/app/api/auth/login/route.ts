import { NextRequest, NextResponse } from "next/server";
import { usersStore, User } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || "calon.talenta@gmail.com";
    const name = body.name || "Calon Talenta IT";
    const sub = body.sub || `google_sub_${Date.now()}`;

    // Find existing user by google_sub or email
    let existingUser: User | undefined;
    for (const u of usersStore.values()) {
      if (u.google_sub === sub || u.email === email) {
        existingUser = u;
        break;
      }
    }

    if (!existingUser) {
      // Create new user (username is null initially to trigger onboarding)
      const newId = `user_${Date.now()}`;
      existingUser = {
        id: newId,
        google_sub: sub,
        email,
        name,
        username: null,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${newId}`,
      };
      usersStore.set(newId, existingUser);
    }

    const response = NextResponse.json({
      success: true,
      data: {
        user: existingUser,
        needsOnboarding: !existingUser.username,
      },
    });

    // Set HTTP-only session cookie
    response.cookies.set("jalanitku_session", existingUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error?.message || "Gagal masuk" } },
      { status: 500 }
    );
  }
}

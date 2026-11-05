import { NextRequest, NextResponse } from "next/server";
import { findUserByGoogleSubOrEmail, saveUser, User, signSessionId } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = req.cookies.get("oauth_state")?.value;

  if (!code || (savedState && state !== savedState)) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", req.url));
  }

  try {
    const origin = url.origin;
    const redirectUri = `${origin}/api/auth/google/callback`;
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResp.json();
    if (!tokenResp.ok || !tokenData.access_token) {
      return NextResponse.redirect(new URL("/login?error=token_failed", req.url));
    }

    const userInfoResp = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await userInfoResp.json();

    const sub = profile.sub || `google_sub_${Date.now()}`;
    const email = (profile.email || "").toLowerCase();
    const name = profile.name || "Google User";
    const picture = profile.picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${sub}`;

    let existingUser: User | null = await findUserByGoogleSubOrEmail(sub, email);

    if (!existingUser) {
      const newId = `user_${Date.now()}`;
      existingUser = {
        id: newId,
        google_sub: sub,
        email,
        name,
        username: null,
        avatar_url: picture,
      };
      saveUser(existingUser);
    }

    const needsOnboarding = !existingUser.username;
    const targetUrl = needsOnboarding ? "/onboarding" : "/dashboard";
    const res = NextResponse.redirect(new URL(targetUrl, req.url));

    // Simpan token bertanda tangan HMAC
    res.cookies.set("jalanitku_session", signSessionId(existingUser.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (needsOnboarding) {
      res.cookies.set("jalanitku_needs_onboarding", "1", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    } else {
      res.cookies.delete("jalanitku_needs_onboarding");
    }

    res.cookies.delete("oauth_state");
    return res;
  } catch (err) {
    return NextResponse.redirect(new URL("/login?error=oauth_error", req.url));
  }
}

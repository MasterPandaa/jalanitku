import { NextRequest, NextResponse } from "next/server";
        
        export async function GET(req: NextRequest) {
          const clientId = process.env.GOOGLE_CLIENT_ID;
          if (!clientId) {
            return NextResponse.redirect(new URL("/login?mode=select_account", req.url));
          }
        
          const origin = req.nextUrl.origin;
          const redirectUri = `${origin}/api/auth/google/callback`;
          const state = Math.random().toString(36).substring(2, 15);
        
          const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
          googleAuthUrl.searchParams.set("client_id", clientId);
          googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
          googleAuthUrl.searchParams.set("response_type", "code");
          googleAuthUrl.searchParams.set("scope", "openid email profile");
          googleAuthUrl.searchParams.set("state", state);
          googleAuthUrl.searchParams.set("access_type", "offline");
          googleAuthUrl.searchParams.set("prompt", "select_account");
        
          const res = NextResponse.redirect(googleAuthUrl);
          res.cookies.set("oauth_state", state, { httpOnly: true, maxAge: 600, path: "/" });
          return res;
        }
        
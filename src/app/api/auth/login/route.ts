import { NextRequest, NextResponse } from "next/server";
        import { findUserByGoogleSubOrEmail, saveUser, User } from "@/lib/auth";
        
        export async function POST(req: NextRequest) {
          try {
            const body = await req.json().catch(() => ({}));
            const email = (body.email || "calon.talenta@gmail.com").trim().toLowerCase();
            const name = (body.name || "Calon Talenta IT").trim();
            const sub = body.sub || `google_sub_${email.replace(/[^a-zA-Z0-9_]/g, "_")}`;
        
            // Find existing user by google_sub or email across local store and Supabase
            let existingUser: User | null = await findUserByGoogleSubOrEmail(sub, email);
        
            if (!existingUser) {
              // Create new user (username is null initially to trigger onboarding)
              const newId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
              existingUser = {
                id: newId,
                google_sub: sub,
                email,
                name,
                username: null,
                avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newId)}`,
              };
              saveUser(existingUser);
            } else {
              // Update name if changed
              if (name && existingUser.name !== name) {
                existingUser.name = name;
                saveUser(existingUser);
              }
            }
        
            const response = NextResponse.json({
              success: true,
              data: {
                user: {
                  id: existingUser.id,
                  name: existingUser.name,
                  email: existingUser.email,
                  username: existingUser.username,
                  avatar_url: existingUser.avatar_url,
                  has_jalan_id: Boolean(existingUser.has_jalan_id),
                  has_cocoklogiku: Boolean(existingUser.has_cocoklogiku),
                },
                needsOnboarding: !existingUser.username,
              },
            });
        
            // Set secure HTTP-only session cookie (7 days expiry)
            response.cookies.set("jalanitku_session", existingUser.id, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 7, // 7 days (604,800 seconds)
            });
        
            return response;
          } catch (error: any) {
            return NextResponse.json(
              { success: false, error: { message: error?.message || "Gagal masuk" } },
              { status: 500 }
            );
          }
        }
        
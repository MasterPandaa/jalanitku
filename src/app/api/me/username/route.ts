import { NextRequest, NextResponse } from "next/server";
        import { getSessionUser, saveUser, validateUsername, checkUsernameAvailability } from "@/lib/auth";
        
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
          user.username = username.trim().toLowerCase();
          saveUser(user);
        
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
        
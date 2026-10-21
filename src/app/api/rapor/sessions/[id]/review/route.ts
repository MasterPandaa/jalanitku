import { NextRequest, NextResponse } from "next/server";
        import { getSessionUser } from "@/lib/auth";
        import { getRaporSession, getRaporSessionAsync, getRaporSessionReview } from "@/lib/rapor";
        
        export async function GET(
          req: NextRequest,
          { params }: { params: Promise<{ id: string }> }
        ) {
          try {
            const user = await getSessionUser();
            if (!user) {
              return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        
            const { id } = await params;
            const session = getRaporSession(id) || (await getRaporSessionAsync(id));
            if (!session || session.userId !== user.id) {
              return NextResponse.json({ error: "Sesi tidak ditemukan" }, { status: 404 });
            }
        
            if (!session.isFinished) {
              return NextResponse.json({ error: "Sesi tes belum diselesaikan." }, { status: 400 });
            }
        
            const reviews = getRaporSessionReview(id);
            return NextResponse.json({
              session_id: id,
              role_slug: session.roleSlug,
              reviews,
            });
          } catch (err: any) {
            return NextResponse.json({ error: err.message || "Gagal memuat pembahasan soal" }, { status: 500 });
          }
        }
        
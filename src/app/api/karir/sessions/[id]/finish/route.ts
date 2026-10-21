import { NextRequest, NextResponse } from "next/server";
        import { calculateCareerResult, careerSessions, getCareerSessionAsync } from "@/lib/karir";
        
        export async function POST(
          req: NextRequest,
          { params }: { params: Promise<{ id: string }> }
        ) {
          const { id } = await params;
          const session = careerSessions.get(id) || (await getCareerSessionAsync(id));
        
          if (!session) {
            return NextResponse.json(
              { success: false, error: { message: "Sesi tidak ditemukan" } },
              { status: 404 }
            );
          }
        
          try {
            const result = calculateCareerResult(id);
            return NextResponse.json({
              success: true,
              data: result,
              message: "Hasil JalanID berhasil diterbitkan",
            });
          } catch (error: any) {
            return NextResponse.json(
              { success: false, error: { message: error.message } },
              { status: 400 }
            );
          }
        }
        
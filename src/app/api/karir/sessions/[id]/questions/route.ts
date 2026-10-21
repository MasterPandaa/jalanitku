import { NextRequest, NextResponse } from "next/server";
        import { getQuestionsForLevel, careerSessions, getCareerSessionAsync } from "@/lib/karir";
        
        export async function GET(
          req: NextRequest,
          { params }: { params: Promise<{ id: string }> }
        ) {
          const { id } = await params;
          const session = careerSessions.get(id) || (await getCareerSessionAsync(id));
        
          if (!session) {
            return NextResponse.json(
              { success: false, error: { message: "Sesi JalanKarir tidak ditemukan" } },
              { status: 404 }
            );
          }
        
          const { searchParams } = new URL(req.url);
          const requestedLevel = Number(searchParams.get("level")) || session.current_level;
        
          try {
            const questions = getQuestionsForLevel(id, requestedLevel);
            return NextResponse.json({
              success: true,
              data: {
                session_id: id,
                current_level: session.current_level,
                level: requestedLevel,
                total_levels: 5,
                questions,
              },
            });
          } catch (error: any) {
            return NextResponse.json(
              { success: false, error: { message: error.message } },
              { status: 400 }
            );
          }
        }
        
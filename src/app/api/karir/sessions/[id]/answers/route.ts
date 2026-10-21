import { NextRequest, NextResponse } from "next/server";
        import { recordLevelAnswers, careerSessions, getCareerSessionAsync } from "@/lib/karir";
        
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
        
          const body = await req.json().catch(() => ({}));
          const answers = body.answers;
        
          if (!Array.isArray(answers) || answers.length === 0) {
            return NextResponse.json(
              { success: false, error: { message: "Daftar jawaban tidak valid" } },
              { status: 400 }
            );
          }
        
          try {
            recordLevelAnswers(id, answers);
            return NextResponse.json({
              success: true,
              data: {
                session_id: id,
                next_level: session.current_level,
                is_finished: session.answers.size >= 12 || session.current_level >= 5,
              },
            });
          } catch (error: any) {
            return NextResponse.json(
              { success: false, error: { message: error.message } },
              { status: 400 }
            );
          }
        }
        
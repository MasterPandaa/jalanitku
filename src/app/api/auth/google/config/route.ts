import { NextResponse } from "next/server";
        
        export async function GET() {
          const hasGcpCreds = Boolean(
            process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
          );
          return NextResponse.json({
            success: true,
            data: {
              realOAuthEnabled: hasGcpCreds,
            },
          });
        }
        
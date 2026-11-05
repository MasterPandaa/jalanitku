import { NextResponse } from "next/server";

export async function GET() {
  const isProd = process.env.NODE_ENV === "production";
  const hasGcpCreds = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );
  // Real OAuth Google aktif jika kredensial GCP terpasang dan (di production atau diaktifkan eksplisit)
  const realOAuthEnabled = Boolean(
    hasGcpCreds && (isProd || process.env.ENABLE_GOOGLE_AUTH === "true")
  );

  return NextResponse.json({
    success: true,
    data: {
      realOAuthEnabled,
    },
  });
}

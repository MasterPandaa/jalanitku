import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Berhasil keluar",
  });

  response.cookies.delete("jalanitku_session");
  response.cookies.delete("jalanitku_needs_onboarding");
  return response;
}

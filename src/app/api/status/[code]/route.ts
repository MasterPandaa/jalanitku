import { NextRequest, NextResponse } from "next/server";
import { getHttpStatusByCode } from "@/lib/http-status";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const numCode = parseInt(code, 10);

  if (isNaN(numCode) || numCode < 100 || numCode > 599) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid HTTP status code. Must be between 100 and 599.",
      },
      { status: 400 }
    );
  }

  const statusDetail = getHttpStatusByCode(numCode);

  const responseHeaders = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "X-Powered-By": "JalanITku-Status-Engine",
  });

  // Tambahkan headers spesifik sesuai protokol HTTP standar
  if (statusDetail) {
    Object.entries(statusDetail.sampleHeaders).forEach(([key, val]) => {
      responseHeaders.set(key, val);
    });
  }

  // 3xx Redirection handling
  if (numCode >= 300 && numCode < 400) {
    if (!responseHeaders.has("Location")) {
      responseHeaders.set("Location", `/status/${numCode}`);
    }
  }

  // Body respon standar
  const body = statusDetail
    ? {
        success: numCode < 400,
        statusCode: numCode,
        series: statusDetail.series,
        name: statusDetail.name,
        titleId: statusDetail.titleId,
        message: statusDetail.description,
        technicalContext: statusDetail.technicalContext,
        responsibleRole: statusDetail.responsibleRole,
        isIdempotent: statusDetail.isIdempotent,
        isCacheable: statusDetail.isCacheable,
        timestamp: new Date().toISOString(),
      }
    : {
        success: numCode < 400,
        statusCode: numCode,
        message: `Simulasi respons kode status HTTP ${numCode}.`,
        timestamp: new Date().toISOString(),
      };

  return new NextResponse(JSON.stringify(body, null, 2), {
    status: numCode,
    headers: responseHeaders,
  });
}

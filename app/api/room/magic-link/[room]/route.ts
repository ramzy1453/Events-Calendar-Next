import { Http } from "@/lib/api/http";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const room = request.nextUrl.searchParams.get("room");

  const response = await Http.post<{ magicLink: string }, null>(
    `/room/magic-link/${room}`,
    null
  );

  NextResponse.json(response?.data);
}

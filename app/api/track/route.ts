import { NextResponse } from "next/server";
import { isTrackablePath } from "@/lib/trackablePaths";
import { recordPageView } from "@/lib/visits";

export async function POST(req: Request) {
  let path = "";
  try {
    const body = (await req.json()) as { path?: string };
    path = typeof body.path === "string" ? body.path.split("?")[0].split("#")[0] : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!path || !isTrackablePath(path)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await recordPageView(path);
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

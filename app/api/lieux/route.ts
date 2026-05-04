import { NextRequest, NextResponse } from "next/server";
import { getAll, create } from "@/lib/sheets";
import { getSessionUser, isAdmin } from "@/lib/permissions";
import { lieuSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const lieux = await getAll("Lieux");
  return NextResponse.json({ lieux });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const parsed = lieuSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { id } = await create("Lieux", parsed.data);
  return NextResponse.json({ id }, { status: 201 });
}

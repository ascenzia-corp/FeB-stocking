import { NextRequest, NextResponse } from "next/server";
import { getById, update } from "@/lib/sheets";
import { getSessionUser, isAdmin } from "@/lib/permissions";
import { lieuSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const existing = await getById("Lieux", params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  const parsed = lieuSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const ok = await update("Lieux", params.id, parsed.data);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await getById("Lieux", params.id);
  return NextResponse.json({ lieu: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await update("Lieux", params.id, { actif: false });
  return NextResponse.json({ archived: true });
}

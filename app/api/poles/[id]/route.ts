import { NextRequest, NextResponse } from "next/server";
import { getById, update, getAll } from "@/lib/sheets";
import { getSessionUser, isAdmin } from "@/lib/permissions";
import { poleSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const existing = await getById("Poles", params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  const parsed = poleSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const ok = await update("Poles", params.id, parsed.data);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await getById("Poles", params.id);
  return NextResponse.json({ pole: updated });
}

// Archive only - soft delete by setting actif=false
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // Refuse hard delete if equipements reference this pole
  const equipements = await getAll("Equipements");
  const used = equipements.some((e) => e.pole === params.id);
  if (used) {
    // Soft archive instead
    await update("Poles", params.id, { actif: false });
    return NextResponse.json({ archived: true });
  }
  await update("Poles", params.id, { actif: false });
  return NextResponse.json({ archived: true });
}

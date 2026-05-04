import { NextRequest, NextResponse } from "next/server";
import { getById, update } from "@/lib/sheets";
import { getSessionUser, isAdmin } from "@/lib/permissions";
import { categorieSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const existing = await getById("Categories", params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  const parsed = categorieSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const ok = await update("Categories", params.id, parsed.data);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await getById("Categories", params.id);
  return NextResponse.json({ categorie: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await update("Categories", params.id, { actif: false });
  return NextResponse.json({ archived: true });
}

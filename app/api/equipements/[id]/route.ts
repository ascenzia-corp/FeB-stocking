import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/sheets";
import {
  getSessionUser,
  canEditEquipement,
  canDeleteEquipement,
} from "@/lib/permissions";
import { equipementUpdateSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const equipement = await getById("Equipements", params.id);
  if (!equipement) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ equipement });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await getById("Equipements", params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canEditEquipement(user, existing.pole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json();
  const parsed = equipementUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  // If moving to a different pole, the user must also have rights for the new pole
  if (data.pole && data.pole !== existing.pole) {
    if (!canEditEquipement(user, data.pole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }
  const ok = await update("Equipements", params.id, data);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await getById("Equipements", params.id);
  return NextResponse.json({ equipement: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canDeleteEquipement(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const ok = await remove("Equipements", params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

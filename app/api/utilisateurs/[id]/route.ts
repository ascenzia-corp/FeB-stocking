import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getById, update } from "@/lib/sheets";
import { getSessionUser, isAdmin } from "@/lib/permissions";
import { utilisateurUpdateSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const existing = await getById("Utilisateurs", params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  const parsed = utilisateurUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  const role = data.role ?? existing.role;
  const pole = data.pole_rattache ?? existing.pole_rattache;
  if (role === "responsable_pole" && !pole) {
    return NextResponse.json(
      { error: "Pôle requis pour un responsable de pôle" },
      { status: 400 }
    );
  }
  const updates: Record<string, unknown> = { ...data };
  if (typeof data.mot_de_passe === "string" && data.mot_de_passe.length > 0) {
    updates.mot_de_passe = await bcrypt.hash(data.mot_de_passe, 12);
  } else {
    delete updates.mot_de_passe;
  }
  if (role !== "responsable_pole") {
    updates.pole_rattache = "";
  }
  const ok = await update("Utilisateurs", params.id, updates);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

// Désactivation (soft)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await update("Utilisateurs", params.id, { actif: false });
  return NextResponse.json({ archived: true });
}

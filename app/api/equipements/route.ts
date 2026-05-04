import { NextRequest, NextResponse } from "next/server";
import { getAll, create, getById } from "@/lib/sheets";
import { getSessionUser, canCreateEquipement } from "@/lib/permissions";
import { equipementCreateSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const equipements = await getAll("Equipements");
  return NextResponse.json({ equipements });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = equipementCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  if (!canCreateEquipement(user, data.pole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await create("Equipements", data);
  const created = await getById("Equipements", id);
  return NextResponse.json({ equipement: created }, { status: 201 });
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Role } from "@/types";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  pole_rattache: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
    pole_rattache: session.user.pole_rattache || "",
  };
}

export function isAdmin(user: SessionUser | null): boolean {
  return !!user && user.role === "admin";
}

export function canEditEquipement(
  user: SessionUser | null,
  equipementPoleId: string
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "responsable_pole") {
    return !!user.pole_rattache && user.pole_rattache === equipementPoleId;
  }
  return false;
}

export function canCreateEquipement(
  user: SessionUser | null,
  newPoleId: string
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "responsable_pole") {
    return !!user.pole_rattache && user.pole_rattache === newPoleId;
  }
  return false;
}

export function canDeleteEquipement(user: SessionUser | null): boolean {
  return isAdmin(user);
}

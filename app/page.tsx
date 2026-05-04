import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/permissions";
import { AppShell } from "@/components/layout/AppShell";
import { InventoryView } from "@/components/equipements/InventoryView";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return (
    <AppShell>
      <InventoryView />
    </AppShell>
  );
}

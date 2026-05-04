/* eslint-disable no-console */
import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  ensureSheetsExist,
  getAll,
  create,
  findUserByEmail,
} from "../lib/sheets";

const DEFAULT_POLES = [
  "Logistique",
  "Bivouac",
  "Sécurité",
  "Sanitaires",
  "Sonorisation",
  "Médical",
  "Communication",
];

const DEFAULT_LIEUX = [
  { nom: "Entrepôt principal", adresse: "" },
  { nom: "Local paroissial", adresse: "" },
];

const DEFAULT_CATEGORIES = [
  "Tentes",
  "Mobilier",
  "Sonorisation",
  "Sécurité",
  "Cuisine",
  "Médical",
  "Signalétique",
  "Divers",
];

async function main() {
  console.log("→ Vérification des onglets...");
  await ensureSheetsExist();
  console.log("✓ Onglets prêts");

  // Pôles
  const existingPoles = await getAll("Poles");
  const existingPoleNames = new Set(existingPoles.map((p) => p.nom));
  for (const nom of DEFAULT_POLES) {
    if (!existingPoleNames.has(nom)) {
      await create("Poles", { nom, responsable: "", actif: true });
      console.log(`  + Pôle : ${nom}`);
    }
  }

  // Lieux
  const existingLieux = await getAll("Lieux");
  const existingLieuxNames = new Set(existingLieux.map((l) => l.nom));
  for (const lieu of DEFAULT_LIEUX) {
    if (!existingLieuxNames.has(lieu.nom)) {
      await create("Lieux", { ...lieu, actif: true });
      console.log(`  + Lieu : ${lieu.nom}`);
    }
  }

  // Catégories
  const existingCats = await getAll("Categories");
  const existingCatNames = new Set(existingCats.map((c) => c.nom));
  for (const nom of DEFAULT_CATEGORIES) {
    if (!existingCatNames.has(nom)) {
      await create("Categories", { nom, actif: true });
      console.log(`  + Catégorie : ${nom}`);
    }
  }

  // Admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.warn(
      "⚠ ADMIN_EMAIL ou ADMIN_PASSWORD non défini — admin non créé"
    );
  } else {
    const existing = await findUserByEmail(adminEmail);
    if (existing) {
      console.log(`  · Admin déjà existant : ${adminEmail}`);
    } else {
      const hash = await bcrypt.hash(adminPassword, 12);
      await create("Utilisateurs", {
        email: adminEmail,
        nom: "Administrateur",
        mot_de_passe: hash,
        role: "admin",
        pole_rattache: "",
        actif: true,
      });
      console.log(`  + Admin créé : ${adminEmail}`);
    }
  }

  console.log("✓ Initialisation terminée");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

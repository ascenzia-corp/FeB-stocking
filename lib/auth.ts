import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/sheets";
import type { Role } from "@/types";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email);
        if (!user || !user.actif) return null;
        if (!user.mot_de_passe) return null;
        const ok = await bcrypt.compare(credentials.password, user.mot_de_passe);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.nom,
          role: user.role,
          pole_rattache: user.pole_rattache || "",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;
        const existing = await findUserByEmail(email);
        if (!existing || !existing.actif) return false;
        // mutate user with our DB info so it lands in jwt callback
        (user as { id: string }).id = existing.id;
        (user as { name: string }).name = existing.nom;
        (user as { role: Role }).role = existing.role;
        (user as { pole_rattache: string }).pole_rattache =
          existing.pole_rattache || "";
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role: Role }).role;
        token.pole_rattache =
          (user as { pole_rattache: string }).pole_rattache || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.pole_rattache = (token.pole_rattache as string) || "";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserById } from "./data/user";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedData = LoginSchema.safeParse(credentials);
        if (!validatedData.success) return null;

        // Middleware-safe dummy fallback
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      return !!existingUser?.emailVerified;
    },

    async jwt({ token, user, account }) {
      if (!token.sub) return token;
      if (!user) return token;

      token.role = user.role ?? "defaultRole";
      token.isOauth = !!account;
      return token;
    },

    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          isOauth: token.isOauth,
        },
      };
    },
  },
};

export default authConfig;

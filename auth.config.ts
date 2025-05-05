import authConfigBase from "./auth.config.base";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const fullConfig: NextAuthConfig = {
  ...authConfigBase,
  adapter: PrismaAdapter(prisma),
  providers: authConfigBase.providers.map((provider) => {
    if (
      typeof provider === "object" &&
      "name" in provider &&
      provider.name === "Credentials"
    ) {
      // Cast to CredentialsConfig to satisfy TS
      const credsProvider = provider as CredentialsConfig;

      return {
        ...credsProvider,
        authorize: async (credentialsRaw, req) => {
          const validated = LoginSchema.safeParse(credentialsRaw);

          if (!validated.success) return null;

          const { email, password } = validated.data;
          const user = await prisma.user.findFirst({ where: { email } });

          if (!user?.password) return null;

          const isValid = await bcrypt.compare(password, user.password);
          return isValid ? user : null;
        },
      };
    }

    return provider;
  }),
};

export default fullConfig;

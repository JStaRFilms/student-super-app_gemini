import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      matricNumber: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    matricNumber: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        matricNumber: { label: "Matriculation Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.matricNumber || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { matricNumber: credentials.matricNumber as string },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword,
        );

        if (isValidPassword) {
          return user;
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.matricNumber = user.matricNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.matricNumber = token.matricNumber as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

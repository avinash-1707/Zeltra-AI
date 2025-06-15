import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      avatarUrl?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    provider?: string;
    providerAccountId?: string;
    avatarUrl?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
  }
}

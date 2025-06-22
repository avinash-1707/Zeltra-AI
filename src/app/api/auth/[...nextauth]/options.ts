import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Only on first login or token refresh with account info
      if (account && profile) {
        const email = profile.email;
        const name = profile.name;
        // Handle different avatar URL properties for different providers
        let avatarUrl: string | undefined;
        if (account.provider === "google") {
          avatarUrl = (profile as any).picture; // Google uses 'picture'
        } else if (account.provider === "github") {
          avatarUrl = (profile as any).avatar_url; // GitHub uses 'avatar_url'
        }
        const provider = account.provider;
        const providerAccountId = account.providerAccountId;

        if (!email) {
          throw new Error("Oauth provider did not return an email");
        }

        // 1. Try finding existing user by email
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          // Optional: update provider/avatar if missing
          const needsUpdate =
            !user.avatarUrl || !user.provider || !user.providerAccountId;
          if (needsUpdate) {
            user = await prisma.user.update({
              where: { email },
              data: {
                avatarUrl: user.avatarUrl || avatarUrl,
                provider: user.provider || provider,
                providerAccountId: user.providerAccountId || providerAccountId,
              },
            });
          }
        } else {
          // 2. Create new user
          user = await prisma.user.create({
            data: {
              email,
              name,
              avatarUrl,
              provider,
              providerAccountId,
            },
          });
        }

        // 3. Attach to token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatarUrl = user.avatarUrl;
      }

      return token;
    },

    // Called whenever `useSession()` or `getServerSession()` runs
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.avatarUrl = token.avatarUrl;
      return session;
    },
  },
  pages: {
    signIn: "/?loginRequired=true",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60, // 5 days for session expiration
  },
  secret: process.env.NEXTAUTH_SECRET,
};

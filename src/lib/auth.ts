import NextAuth, { type DefaultSession, type NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    picture?: string | null;
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing Google OAuth environment variables: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) return null;

        await connectDB();
        const user = await User.findOne({ email })
          .select("+password firstName lastName email image phone provider")
          .lean();

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: String(user._id),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          image: user.image ?? null,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      await connectDB();
      const email = (profile?.email ?? user.email ?? "").toLowerCase();
      if (!email) return false;

      const existing = await User.findOne({ email });
      if (existing) {
        if (!existing.image && user.image) {
          existing.image = user.image;
          await existing.save();
        }
        user.id = String(existing._id);
        return true;
      }

      const fullName = profile?.name ?? user.name ?? "";
      const [firstName = "", ...rest] = fullName.trim().split(/\s+/);
      const lastName = rest.join(" ");

      const created = await User.create({
        firstName: firstName || "Google",
        lastName: lastName || "Kullanıcı",
        email,
        image: user.image ?? undefined,
        provider: "google",
      });

      user.id = String(created._id);
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.firstName = (user as { firstName?: string }).firstName ?? null;
        token.lastName = (user as { lastName?: string }).lastName ?? null;
        token.phone = (user as { phone?: string | null }).phone ?? null;
        token.picture = user.image ?? token.picture ?? null;
      }
      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.picture = session.user.image ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? "";
        session.user.firstName = token.firstName ?? null;
        session.user.lastName = token.lastName ?? null;
        session.user.phone = token.phone ?? null;
        session.user.image = (token.picture as string | null) ?? session.user.image;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export async function auth() {
  return await getServerSession(authOptions);
}
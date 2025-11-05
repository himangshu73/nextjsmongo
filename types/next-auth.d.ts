import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

type UserRole = "user" | "admin" | "moderator";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: UserRole;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
    };
  }
}

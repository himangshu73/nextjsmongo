import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import client from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub, Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role || "user";
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const clientPromise = await client;
      const db = clientPromise.db();
      await db
        .collection("users")
        .updateOne({ email: user.email }, { $set: { role: "user" } });
    },
  },
});

export const runtime = "nodejs";

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import client from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
});

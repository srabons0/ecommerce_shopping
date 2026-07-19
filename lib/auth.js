import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select(
          "+password",
        );
        // console.log("user", user);
        if (!user) throw new Error("No user found with the email");
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isMatch) throw new Error("invalid password");
        if (!user.isActive)
          throw new Error("Account has been disabled, please contact support");
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          });
        }
      }
    return true;
    },
  },
  pages: {
     signIn: "/login",
    error: "/login",

  },
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60,
    // updateAge: 24 * 60 * 60,
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex");
    // },
  },
   secret: process.env.NEXTAUTH_SECRET,
};

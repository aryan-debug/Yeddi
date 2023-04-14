import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../lib/mongodb";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
      async signIn({ profile }) {
        try {
          const client = await clientPromise;
          const db = client.db("yeddi");
          const user = await db.collection("users").findOne({_id: profile.sub})
          if(!user){
            db
            .collection("users")
            .insertOne({_id: profile.sub, name: profile.name, followed: []});
          }
      } catch (e) {
          console.error(e);
      }
        return true;
      },
      async session({ session, token }){
        session.user.sub = token.sub
        return session
      }
  }
}

export default NextAuth(authOptions)
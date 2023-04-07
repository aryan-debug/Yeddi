import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../lib/mongodb";


// Source: https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/google.ts
export interface GoogleProfile extends Record<string, any> {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  hd: string
  iat: number
  iss: string
  jti: string
  name: string
  nbf: number
  picture: string
  sub: string
}

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
      }
  }
}

export default NextAuth(authOptions)
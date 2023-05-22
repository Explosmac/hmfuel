import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions, User } from "next-auth"
import { firestore } from "src/lib/firestore"
import { signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth"
import { auth } from "src/lib/firebase"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as unknown as {
          email: string
          password: string
        }
        const user = await signInWithEmailAndPassword(auth, email, password)
        if (!user) {
          throw new Error("No user")
        } else {
          const { uid, email } = user?.user
          return { id: uid, email }
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        // @ts-ignore
        session.user.uid = token.sub
      }
      return session
    }
  },
  adapter: FirestoreAdapter(firestore),
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

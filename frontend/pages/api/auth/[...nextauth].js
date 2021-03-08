import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  callbacks: {
    async session (session, user) {
      session.jwt = user.jwt
      session.id = user.id
      return session
    },
    async jwt (token, _, account) {
      if (account) {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback`)
        url.searchParams.set("access_token", account.accessToken)
        const response = await fetch(url.toString())
        const data = await response.json()
        token.jwt = data.jwt
        token.id = data.user.id
      }
      return token
    }
  }
})
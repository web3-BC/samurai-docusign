import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          /* eslint-disable */
          id: profile.sub,
          name: profile.sub,
          credentialType:
            profile["https://id.worldcoin.org/beta"].credential_type,
          /* eslint-disable */
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async redirect({}) {
      return "/issuers/contracts/new"
    },
    async signIn({}) {
      return "/issuers/contracts/new"

    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

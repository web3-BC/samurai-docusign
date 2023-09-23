import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      profile(profile) {
        return {
          /* eslint-disable */
          id: profile.sub,
          credential_type:
            profile["https://id.worldcoin.org/beta"].credential_type,
          /* eslint-disable */
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token, user, account, profile, isNewUser)
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

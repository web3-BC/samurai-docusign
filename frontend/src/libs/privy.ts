"use server";

import { PrivyClient } from "@privy-io/server-auth";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
const privyAppSecret = process.env.PRIVY_APP_SECRET || "";

const privy = new PrivyClient(privyAppId, privyAppSecret);

export const getUserIdFromJwt = async (authToken: string) => {
  try {
    const verifiedClaims = await privy.verifyAuthToken(authToken);
    return verifiedClaims.userId;
  } catch (error) {
    console.error(`Token verification failed with error ${error as string}.`);
  }
};

export const getEmailFromUserId = async (userId: string) => {
  try {
    const headers = new Headers({
      "privy-app-id": process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
    });

    // set headers auth info
    const base64Credentials = btoa(`${privyAppId}:${privyAppSecret}`);
    headers.set("Authorization", `Basic ${base64Credentials}`);

    const res = await fetch(`https://auth.privy.io/api/v1/users/${userId}`, {
      headers: headers,
    });
    const result = await res.json();
    return result.linked_accounts[0].email;
  } catch (error) {
    console.error(error);
  }
};

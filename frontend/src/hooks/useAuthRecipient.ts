import { usePrivy } from "@privy-io/react-auth";

import { useRouter, usePathname } from "next/navigation";

export const useAuthRecipient = () => {
  const { ready, authenticated, user, getAccessToken } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  if (ready && !authenticated) {
    localStorage.setItem("recipientPath", pathname || "/");
    router.push("/signers/sign-in");
  }

  return { user, getAccessToken };
};

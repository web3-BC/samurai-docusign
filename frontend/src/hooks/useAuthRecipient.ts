import { usePrivy } from "@privy-io/react-auth";

import { usePathname } from "next/navigation";

export const useAuthRecipient = () => {
  const { ready, authenticated, user, getAccessToken } = usePrivy();
  const pathname = usePathname();
  const { login } = usePrivy();

  if (ready && !authenticated) {
    localStorage.setItem("recipientPath", pathname || "/");
    login()
  }

  return { user, getAccessToken };
};

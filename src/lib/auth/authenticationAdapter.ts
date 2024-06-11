import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";

export const getAuthenticationAdapter = (
  setAuthStatus: (status: boolean) => void,
) => {
  return createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch("/api/nonce");

      if (!response.ok) {
        throw new Error("Failed to verify signature");
      }

      const data: { nonce: string } = await response.json();

      return data.nonce;
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
    verify: async ({ message, signature }) => {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify signature");
      }

      setAuthStatus(true);

      return true;
    },
    signOut: async () => {
      await fetch("/api/logout");

      setAuthStatus(false);
    },
  });
};

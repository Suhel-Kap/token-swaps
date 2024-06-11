import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";
import { signInAction, signOutAction } from "./index";

export const getAuthenticationAdapter = (
  setAuthStatus: (status: boolean) => void,
) => {
  return createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch("/api/nonce");
      const data: { nonce: string } = await response.json();

      return new Promise((resolve) => resolve(data.nonce));
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
      const data = await response.json();

      await signInAction({ jwt: data.jwt });

      setAuthStatus(true);

      return true;
    },
    signOut: async () => {
      await fetch("/api/logout");
      await signOutAction();

      setAuthStatus(false);
    },
  });
};

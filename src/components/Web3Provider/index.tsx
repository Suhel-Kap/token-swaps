"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getAuthenticationAdapter } from "@/lib/auth/authenticationAdapter";
import { isAuthAction } from "@/lib/actions/auth";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [polygon, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const status = isLoading
    ? "loading"
    : isAuth
      ? "authenticated"
      : "unauthenticated";

  // Fetch user when:
  useEffect(() => {
    const checkStatus = async () => {
      const { isAuth } = await isAuthAction();

      setIsAuth(isAuth);
      setIsLoading(false);
    };
    checkStatus();
  }, []);

  const authAdapter = useMemo(() => {
    return getAuthenticationAdapter(setIsAuth);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider adapter={authAdapter} status={status}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
  darkTheme,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getAuthenticationAdapter } from "@/lib/auth/authenticationAdapter";
import { isAuthAction } from "@/lib/actions/auth";
import { useTheme } from "next-themes";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [polygon],
  ssr: true,
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { theme } = useTheme();

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

  const rainbowTheme = theme === "light" ? lightTheme() : darkTheme();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider adapter={authAdapter} status={status}>
          <RainbowKitProvider theme={rainbowTheme}>
            {children}
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

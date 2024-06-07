"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygon, base } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, SIWESession, getDefaultConfig } from "connectkit";
import { siweClient } from "@/lib/siweClient";
import React from "react";

export const ckConfig = getDefaultConfig({
  chains: [polygon, base],
  transports: {
    [polygon.id]: http("https://137.rpc.thirdweb.com"),
    [base.id]: http("https://8453.rpc.thirdweb.com"),
  },
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  appName: "Token Swaps",
});

const config = createConfig(ckConfig);

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <siweClient.Provider
            enabled={true} // defaults true
            signOutOnDisconnect={true} // defaults true
            signOutOnAccountChange={true} // defaults true
          >
            <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
          </siweClient.Provider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
};

"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygon, base } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [polygon, base],
    transports: {
      [polygon.id]: http("https://137.rpc.thirdweb.com"),
      [base.id]: http("https://8453.rpc.thirdweb.com"),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
    appName: "Token Swaps",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

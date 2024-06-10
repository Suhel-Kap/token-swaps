"use client";
import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
} from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
export const MyConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { openAccountModal } = useAccountModal();

  return (
    <>
      <Button onClick={isConnected ? openAccountModal : openConnectModal}>
        {isConnected
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : "Connect"}
      </Button>
    </>
  );
};

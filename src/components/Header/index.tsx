import { ConnectButton } from "./ConnectButton";

export default function Header() {
  return (
    <header className="bg-slate-50 h-20 flex place-items-center justify-around px-4">
      <h1 className="text-2xl font-semibold">Token Swaps</h1>
      <ConnectButton />
    </header>
  );
}

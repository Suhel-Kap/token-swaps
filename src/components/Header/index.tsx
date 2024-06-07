import { MyConnectButton } from "./ConnectButton";

export default function Header() {
  return (
    <header className="bg-slate-50 h-16 flex place-items-center justify-around px-4">
      <h1 className="text-2xl font-semibold">Token Swaps</h1>
      <MyConnectButton />
    </header>
  );
}

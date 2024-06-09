import Link from "next/link";
import { MyConnectButton } from "./ConnectButton";

export default function Header() {
  return (
    <header className="bg-slate-50 h-16 flex place-items-center justify-around px-4">
      <h1 className="text-2xl font-semibold">
        <Link href="/">Token Swaps</Link>
      </h1>
      <MyConnectButton />
    </header>
  );
}

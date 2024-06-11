import Link from "next/link";
import { MyConnectButton } from "./ConnectButton";

export default function Header() {
  return (
    <header className="bg-slate-50 h-16 flex place-items-center justify-center px-4">
      <div className="flex place-items-center max-w-screen-lg w-full justify-between">
        <h1 className="text-2xl font-semibold">
          <Link href="/">Token Swaps</Link>
        </h1>
        <MyConnectButton />
      </div>
    </header>
  );
}

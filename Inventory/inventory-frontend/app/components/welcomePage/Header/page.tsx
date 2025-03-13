"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 c">
      <h1 className="text-2xl font-bold text-gray-400">ERM SYSTEM</h1>
      <nav className="hidden md:flex space-x-6 text-gray-300">
        <span className="cursor-pointer hover:text-black">Home</span>
        <span className="cursor-pointer hover:text-black">Features</span>
        <span className="cursor-pointer hover:text-black">Pricing</span>
      </nav>
      <button
        onClick={() => router.push("/auth/login")}
        className="ml-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Login
      </button>
    </header>
  );
}

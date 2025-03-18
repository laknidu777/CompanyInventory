"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full bg-[#1e293b] py-0 px-0 flex justify-between items-center h-20">
      {/* Title */}
      <h1 className="text-white text-2xl font-bold ml-12">ERM SYSTEM</h1>

      {/* Navigation */}
      <nav className="flex space-x-6 text-[#cbd5e1]">
        <span className="cursor-pointer hover:text-white">Home</span>
        <span className="cursor-pointer hover:text-white">Features</span>
        <span className="cursor-pointer hover:text-white">Pricing</span>
      </nav>

      {/* Login Button */}
      <button
        onClick={() => router.push("/auth/login")}
        className="bg-black text-white px-6 py-2 rounded mr-12 h-10 hover:bg-gray-700"
      >
        Login
      </button>
    </header>
  );
}
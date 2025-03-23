'use client';
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // Get current page route

  return (
    <header className="w-full bg-gray-900 py-4 px-6 flex items-center">
      {/* Title */}
      <h1 className="text-white text-2xl font-bold">ERM SYSTEM</h1>

      {/* Navigation (Centered) */}
      <nav className="flex-grow flex justify-center space-x-8 text-gray-400">
        <span className="cursor-pointer hover:text-white">Home</span>
        <span className="cursor-pointer hover:text-white">Features</span>
        <span className="cursor-pointer hover:text-white">Pricing</span>
      </nav>

      {/* Show Login button only if NOT on the Login page */}
      {pathname !== "/auth/login" && (
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Login
        </button>
      )}
    </header>
  );
}

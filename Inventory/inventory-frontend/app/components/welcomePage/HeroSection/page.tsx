"use client";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center text-center justify-center bg-gray-100 py-16 px-6">
      <h2 className="text-4xl font-bold max-w-2xl text-gray-600">
        Welcome to Your Complete ERM Solution
      </h2>
      <p className="text-lg text-gray-600 mt-3 max-w-lg">
        Streamline your business processes with our integrated platform
      </p>
      <button
        onClick={() => router.push("/get-started")}
        className="mt-5 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Get Started
      </button>
    </section>
  );
}

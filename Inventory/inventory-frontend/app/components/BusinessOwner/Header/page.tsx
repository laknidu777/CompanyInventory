"use client";
import Link from "next/link";

export default function BusinessOwnerHeader() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold">ERM SYSTEM</div>
      <nav className="flex space-x-6">
        <Link href="/dashboard" className="text-white hover:text-black">Dashboard</Link>
        <Link href="/reports" className="text-white hover:text-black">Reports</Link>
        <Link href="/analytics" className="text-white hover:text-black">Analytics</Link>
        <Link href="/support" className="text-white hover:text-black">Support</Link>
      </nav>
      <div className="flex items-center space-x-3">
        <span className="text-gray-400">John Smith</span>
        <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full border">
          JS
        </div>
      </div>
    </header>
  );
}
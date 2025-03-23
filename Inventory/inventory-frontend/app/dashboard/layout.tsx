"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BusinessOwnerHeader from "../components/BusinessOwner/Header/page";
import Sidebar from "../components/sidebar/page";
import Footer from "../components/welcomePage/Footer/page";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // ✅ Hide sidebar for business selection page (dashboard/owner)
  const shouldShowSidebar = !pathname.startsWith("/dashboard/owner") || pathname.startsWith("/dashboard/owner/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex flex-1">
        {/* ✅ Show Sidebar only when needed */}
        {shouldShowSidebar && (
          <div className="w-64 min-h-screen bg-gray-200">
            <Sidebar />
          </div>
        )}

        {/* Main content dynamically updates */}
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

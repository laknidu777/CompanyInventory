'use client';
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BusinessOwnerHeader from "../components/BusinessOwner/Header/page";
import Sidebar from "../components/sidebar/page";
import Footer from "../components/welcomePage/Footer/page";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Hide sidebar for business selection page (dashboard/owner)
  const shouldShowSidebar = !pathname.startsWith("/dashboard/owner") || pathname.startsWith("/dashboard/owner/dashboard");

  // Handler to update sidebar collapsed state
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        {shouldShowSidebar && (
          <div className={`transition-all duration-300 flex-shrink-0 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}>
            <Sidebar onCollapse={handleSidebarCollapse} />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300`}
        >
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
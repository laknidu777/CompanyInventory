'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../../utils/config";
import { LayoutDashboard, Users, Package, Cog, FileText, ShoppingCart, CreditCard, BarChart2, Briefcase, Workflow } from "lucide-react";

const Sidebar = () => {
  const { id } = useParams(); // Get Business ID from URL
  const [businessName, setBusinessName] = useState<string>("Loading...");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/business-owners/business/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Business not found");
        }

        const data = await response.json();
        setBusinessName(data.name);
      } catch (error) {
        console.error("Error fetching business:", error);
        setBusinessName("Business Not Found");
      }
    };

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  const menuSections = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} />, path: `/dashboard/owner/dashboard/${id}` },
    { title: "Users", icon: <Users size={18} />, path: `/dashboard/employee/${id}` },
    { title: "Inventory", icon: <Package size={18} />, path: `/dashboard/owner/inventory/${id}` },
    { title: "Processes", icon: <Workflow size={18} />, path: `/dashboard/owner/processes/${id}` },
    { title: "Sales", icon: <ShoppingCart size={18} />, path: `/dashboard/owner/sales/${id}` },
    { title: "Purchases", icon: <Briefcase size={18} />, path: `/dashboard/owner/purchases/${id}` },
    { title: "Income", icon: <CreditCard size={18} />, path: `/dashboard/owner/income/${id}` },
    { title: "Reports", icon: <BarChart2 size={18} />, path: `/dashboard/owner/reports/${id}` },
    { title: "Business Profile", icon: <Cog size={18} />, path: `/dashboard/owner/business-profile/${id}` },
  ];

  return (
    <aside className={`h-screen bg-gray-50 shadow-sm transition-all duration-300 ${collapsed ? "w-20" : "w-64"} overflow-hidden `}>
      {/* Header */}
      <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white`}>
        {!collapsed && <div className="text-lg font-bold text-gray-700">{businessName}</div>}
        {collapsed && <div className="mx-auto text-xl font-bold text-gray-700">B</div>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-md hover:bg-gray-100">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className={`space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
          {menuSections.map((section, index) => (
            <Link
              key={index}
              href={section.path}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span className="text-gray-500">{section.icon}</span>
              {!collapsed && <span className="ml-3">{section.title}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

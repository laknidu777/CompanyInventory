'use client';
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../../utils/config";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Cog, 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  BarChart2, 
  Briefcase, 
  Workflow,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar = ({ onCollapse }: SidebarProps) => {
  const { id } = useParams(); // Get Business ID from URL
  const pathname = usePathname();
  const [businessName, setBusinessName] = useState<string>("Loading...");
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    users: false
  });

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
    
    // Auto-expand Users menu if on a users-related page
    if (pathname.includes('/dashboard/employee/')) {
      setExpandedMenus(prev => ({ ...prev, users: true }));
    }
  }, [id, pathname]);

  useEffect(() => {
    // Notify parent component when collapsed state changes
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }, [collapsed, onCollapse]);

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({ 
      ...prev, 
      [menuKey]: !prev[menuKey] 
    }));
  };

  const menuSections = [
    { 
      title: "Dashboard", 
      icon: <LayoutDashboard size={18} />, 
      path: `/dashboard/owner/dashboard/${id}`,
      type: "link"
    },
    { 
      title: "Users", 
      icon: <Users size={18} />, 
      type: "dropdown",
      key: "users",
      subItems: [
        { title: "Employees", path: `/dashboard/employee/${id}` },
        { title: "User Roles", path: `/dashboard/employee/${id}/user-roles` }
      ]
    },
    { 
      title: "Inventory", 
      icon: <Package size={18} />, 
      path: `/dashboard/inventory/${id}`,
      type: "link"
    },
    { 
      title: "Processes", 
      icon: <Workflow size={18} />, 
      path: `/dashboard/processes/${id}`,
      type: "link"
    },
    { 
      title: "Sales", 
      icon: <ShoppingCart size={18} />, 
      path: `/dashboard/owner/sales/${id}`,
      type: "link"
    },
    { 
      title: "Purchases", 
      icon: <Briefcase size={18} />, 
      path: `/dashboard/owner/purchases/${id}`,
      type: "link"
    },
    { 
      title: "Income", 
      icon: <CreditCard size={18} />, 
      path: `/dashboard/owner/income/${id}`,
      type: "link"
    },
    { 
      title: "Reports", 
      icon: <BarChart2 size={18} />, 
      path: `/dashboard/owner/reports/${id}`,
      type: "link"
    },
    { 
      title: "Business Profile", 
      icon: <Cog size={18} />, 
      path: `/dashboard/owner/business-profile/${id}`,
      type: "link"
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className={`h-screen bg-gray-50 shadow-sm transition-all duration-300 ${collapsed ? "w-20" : "w-64"} overflow-hidden sticky top-0`}>
      {/* Header */}
      <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white`}>
        {!collapsed && <div className="text-lg font-bold text-gray-700 truncate">{businessName}</div>}
        {collapsed && <div className="mx-auto text-xl font-bold text-gray-700">B</div>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-gray-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className={`space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
          {menuSections.map((section, index) => (
            <div key={index}>
              {section.type === "link" ? (
                <Link
                  href={section.path || "#"}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(section.path || "") ? "bg-gray-700 text-white" : "text-gray-700 hover:bg-gray-300 hover:text-black"
                  }`}
                  title={collapsed ? section.title : ""}
                >
                  <span className={isActive(section.path || "") ? "text-white" : "text-gray-700"}>{section.icon}</span>
                  {!collapsed && <span className="ml-3 truncate">{section.title}</span>}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => !collapsed && toggleMenu(section.key || '')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname.includes(section.subItems?.[0]?.path?.split('/').slice(0, 3).join('/') || '') 
                        ? "bg-gray-700 text-white" 
                        : "text-gray-700 hover:bg-gray-300 hover:text-black"
                    }`}
                    title={collapsed ? section.title : ""}
                  >
                    <div className="flex items-center">
                      <span className={pathname.includes(section.subItems?.[0]?.path?.split('/').slice(0, 3).join('/') || '') ? "text-white" : "text-gray-500"}>
                        {section.icon}
                      </span>
                      {!collapsed && <span className="ml-3 truncate">{section.title}</span>}
                    </div>
                    {!collapsed && (
                      <span className="text-gray-500">
                        {section.key && expandedMenus[section.key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    )}
                  </button>
                  
                  {/* Dropdown menu items */}
                  {(section.key && (expandedMenus[section.key] || collapsed)) && section.subItems && (
                    <div className={`mt-1 ${collapsed ? "pl-0" : "pl-8"}`}>
                      {section.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive(subItem.path) ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-300 hover:text-black"
                          }`}
                          title={collapsed ? subItem.title : ""}
                        >
                          {collapsed ? (
                            <span className={isActive(subItem.path) ? "text-white" : "text-gray-500"}>
                              {subIndex === 0 ? "E" : "R"}
                            </span>
                          ) : (
                            <span className="truncate">{subItem.title}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
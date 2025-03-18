'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, LayoutDashboard, Users, Package, Cog, FileText, 
         ShoppingCart, CreditCard, BarChart2, Briefcase, Database, 
         HardDrive, Workflow } from 'lucide-react';

type MenuSection = {
  title: string;
  icon: React.ReactNode;
  type: 'link' | 'dropdown';
  path?: string;
  items?: {
    name: string;
    path: string;
  }[];
};

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const menuSections: MenuSection[] = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      type: 'link',
      path: '/'
    },
    {
      title: 'Users',
      icon: <Users size={18} />,
      type: 'dropdown',
      items: [
        { name: 'Employees', path: '/dashboard/employee' },
        { name: 'User Roles', path: '/dashboard/employee/user-roles' }
      ]
    },
    {
      title: 'Inventory',
      icon: <Package size={18} />,
      type: 'dropdown',
      items: [
        { name: 'Items', path: '/dashboard/inventory' },
        
      ]
    },
    {
      title: 'Processes',
      icon: <Workflow size={18} />,
      type: 'dropdown',
      items: [
        { name: 'Items in Process', path: '/dashboard/processes' },
        { name: 'Process Settings', path: '/dashboard/processes/add-process' },
       
      ]
    },
    {
      title: 'Sales',
      icon: <ShoppingCart size={18} />,
      type: 'dropdown',
      items: [
        { name: 'Customers', path: '/dashboard/customer' },
        { name: 'Sales Orders', path: '/dashboard/sales' },
        { name: 'Invoices', path: '/dashboard/sales/invoices' },
        { name: 'Payment Statuses', path: '/dashboard/sales/payment-statuses' },
        { name: 'Credit Notes', path: '/dashboard/sales/credit-notes' }
      ]
    },
    {
      title: 'Purchases',
      icon: <Briefcase size={18} />,
      type: 'dropdown',
      items: [
        { name: 'Suppliers', path: '/dashboard/purchases/suppliers' },
        { name: 'Expenses', path: '/dashboard/purchases/expenses' },
        { name: 'Purchases', path: '/dashboard/purchases' },
        { name: 'Bills', path: '/dashboard/purchases/bills' },
        { name: 'Credits', path: '/dashboard/purchases/credits' }
      ]
    },
    {
      title: 'Income',
      icon: <CreditCard size={18} />,
      type: 'link',
      path: '/dashboard/income'
    },
    {
      title: 'Reports',
      icon: <BarChart2 size={18} />,
      type: 'link',
      path: '/dashboard/reports'
    },
    {
      title: 'Business Profile',
      icon: <Cog size={18} />,
      type: 'link',
      path: '/dashboard/business-profile'
    },
    {
      title: 'Your Drive',
      icon: <HardDrive size={18} />,
      type: 'dropdown',
      items: [
        { name: 'View Drive', path: '/dashboard/drive' }
      ]
    }
  ];

  return (
    <aside 
      className={`h-screen bg-gray-50 shadow-sm transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } overflow-hidden`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white`}>
        {!collapsed && (
          <div className="text-lg font-bold text-gray-60 ">Acme Corp</div>
        )}
        {collapsed && (
          <div className="mx-auto text-xl font-bold text-blue-600">A</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="p-2 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className={`space-y-1 ${collapsed ? 'px-2' : 'px-3'}`}>
          {menuSections.map((section, index) => (
            <div key={index} className="py-1">
              {section.type === 'link' ? (
                <Link
                  href={section.path || '#'}
                  className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-blue-50 hover:text-blue-600 group transition-colors ${
                    collapsed ? 'justify-center' : 'justify-between'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-gray-500 group-hover:text-blue-500">{section.icon}</span>
                    {!collapsed && <span className="ml-3">{section.title}</span>}
                  </div>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleDropdown(section.title)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-blue-50 hover:text-blue-600 group transition-colors ${
                      openDropdown === section.title ? 'bg-blue-50 text-blue-600' : ''
                    } ${collapsed ? 'justify-center' : 'justify-between'}`}
                  >
                    <div className="flex items-center">
                      <span className={`text-gray-500 ${openDropdown === section.title ? 'text-blue-500' : ''} group-hover:text-blue-500`}>
                        {section.icon}
                      </span>
                      {!collapsed && <span className="ml-3">{section.title}</span>}
                    </div>
                    {!collapsed && (
                      <span className="ml-auto">
                        {openDropdown === section.title ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                  
                  {/* Only show dropdown when the sidebar is not collapsed or when hover on collapsed state */}
                  {openDropdown === section.title && !collapsed && (
                    <div className="mt-1 pl-10 space-y-1">
                      {section.items?.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.path}
                          className="block px-3 py-2 text-sm rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
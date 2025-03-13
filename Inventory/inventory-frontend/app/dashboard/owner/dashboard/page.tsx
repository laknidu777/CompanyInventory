"use client";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Footer from "../../../components/welcomePage/Footer/page";
import Link from "next/link";

export default function BusinessManagementDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-100 p-4 border-r">
          <h3 className="text-xl font-bold mb-4">Acme Corporation</h3>
          <p className="text-gray-600 mb-6">Technology</p>
          <nav className="space-y-2">
            <Link href="/business-dashboard" className="block px-4 py-2 bg-black text-white rounded">Dashboard</Link>
            <Link href="/employees" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Employees</Link>
            <Link href="/inventory" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Inventory</Link>
            <Link href="/processes" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Processes</Link>
            <Link href="/sales" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Sales</Link>
            <Link href="/income" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Income</Link>
            <Link href="/expenses" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Expenses</Link>
            <Link href="/reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Reports</Link>
            <Link href="/business-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Business Profile</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <div className="border px-4 py-2 rounded text-gray-700">March 1 - March 13, 2025 ▼</div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
              <p className="text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold">$124,500</h3>
              <p className="text-green-600">↑ 12.5%</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
              <p className="text-gray-600">Total Orders</p>
              <h3 className="text-2xl font-bold">347</h3>
              <p className="text-green-600">↑ 8.2%</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
              <p className="text-gray-600">Active Processes</p>
              <h3 className="text-2xl font-bold">28</h3>
              <p className="text-red-600">↓ 3.4%</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="flex space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg">Add Employee</button>
              <button className="bg-black text-white px-4 py-2 rounded-lg">New Process</button>
              <button className="bg-black text-white px-4 py-2 rounded-lg">Update Inventory</button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

"use client";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Link from "next/link";

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">Your Businesses</h2>
          <Link href="/dashboard/owner/registerbusiness">
            <button className="bg-black text-white px-6 py-2 rounded-lg">+ Create Business</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          <div className="bg-gray-100 shadow-md p-6 rounded-lg border border-gray-300">
            <h3 className="text-xl font-bold">Acme Corporation</h3>
            <p className="text-gray-600">Technology</p>
            <p className="text-gray-500 text-sm">Last accessed: Today</p>
            <p className="text-gray-500 text-sm">12 active users</p>
            <div className="flex justify-between mt-4">
            <Link href="/dashboard/owner/dashboard">
                <button className="bg-black text-white px-4 py-2 rounded-lg">Manage</button>
              </Link>
              <button className="border border-gray-400 text-black px-4 py-2 rounded-lg">Reports</button>
            </div>
          </div>
          <div className="bg-gray-100 shadow-md p-6 rounded-lg border border-gray-300">
            <h3 className="text-xl font-bold">Global Industries</h3>
            <p className="text-gray-600">Manufacturing</p>
            <p className="text-gray-500 text-sm">Last accessed: Yesterday</p>
            <p className="text-gray-500 text-sm">28 active users</p>
            <div className="flex justify-between mt-4">
            <Link href="/dashboard/owner/dashboard">
                <button className="bg-black text-white px-4 py-2 rounded-lg">Manage</button>
              </Link>
              <button className="border border-gray-400 text-black px-4 py-2 rounded-lg">Reports</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

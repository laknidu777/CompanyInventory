'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../../utils/config";
type Business = {
  id: number;
  name: string;
  business_type: string;
  registration_number?: string;
  tax_id?: string;
  email: string;
  phone: string;
  address?: string;
  created_at: string;
};

export default function BusinessDashboard() {
  const { id } = useParams(); // Get Business ID from URL
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/business-owners/business/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized or not found");
        }

        const data: Business = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error("Error fetching business:", error);
        router.push("/dashboard/owner"); // Redirect if unauthorized
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1 text-gray-600">
        {/* Main Content */}
        <main className="flex-1 p-8">
          {loading ? (
            // 🔹 Loading Animation (Spinner + Text)
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <span className="text-gray-600 text-lg">Loading business details...</span>
              </div>
            </div>
          ) : business ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <div className="border px-4 py-2 rounded text-gray-700">
                  Created: {new Date(business.created_at).toDateString()}
                </div>
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
            </>
          ) : (
            <p>Business not found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

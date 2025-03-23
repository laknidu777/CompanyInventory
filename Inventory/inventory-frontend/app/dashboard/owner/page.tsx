"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../utils/config"; 
import BusinessOwnerHeader from "../../components/welcomePage/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Link from "next/link";

// ✅ Define the Business type
type Business = {
  id: number;
  name: string;
  business_type: string;
  created_at: string;
};

export default function BusinessDashboard() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]); // ✅ Define the type for businesses
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/business-owners/my-businesses`, {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data: Business[] = await response.json(); // ✅ Type assertion for API response
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        router.push("/auth/login"); // Redirect to login if unauthorized
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">Your Businesses</h2>
          <Link href="/dashboard/owner/registerbusiness">
            <button className="bg-black text-white px-6 py-2 rounded-lg">+ Create Business</button>
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
            {businesses.length > 0 ? (
              businesses.map((business) => (
                <div key={business.id} className="bg-gray-100 shadow-md p-6 rounded-lg border border-gray-300">
                  <h3 className="text-xl font-bold">{business.name}</h3>
                  <p className="text-gray-600">{business.business_type}</p>
                  <p className="text-gray-500 text-sm">Created on: {new Date(business.created_at).toDateString()}</p>
                  <div className="flex justify-between mt-4">
                    <Link href={`/dashboard/owner/dashboard/${business.id}`}>
                      <button className="bg-black text-white px-4 py-2 rounded-lg">Manage</button>
                    </Link>
                    <button className="border border-gray-400 text-black px-4 py-2 rounded-lg">Reports</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No businesses found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Sidebar from "../../components/sidebar/page";

const Sales = () => {
  const router = useRouter();
  
  const [sales, setSales] = useState([
    { id: "SAL001", product: "Laptop", customer: "John Doe", amount: "$1200" },
    { id: "SAL002", product: "Phone", customer: "Jane Smith", amount: "$800" },
    { id: "SAL003", product: "Headphones", customer: "Alice Johnson", amount: "$150" },
  ]);

  const handleDelete = (id: string) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex flex-1 text-gray-600">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
            <button
              onClick={() => router.push("sales/add-sale")}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              + Add Sale
            </button>
          </div>

          {/* Sales Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Sale ID</th>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{sale.id}</td>
                    <td className="px-6 py-3">{sale.product}</td>
                    <td className="px-6 py-3">{sale.customer}</td>
                    <td className="px-6 py-3">{sale.amount}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => router.push(`/sales/edit-sale?id=${sale.id}`)}
                        className="text-blue-600 hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(sale.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Sales;

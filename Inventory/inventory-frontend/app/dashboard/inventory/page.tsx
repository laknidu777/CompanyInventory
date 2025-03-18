'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Sidebar from "../../components/sidebar/page";
import Footer from "../../components/welcomePage/Footer/page";

const Inventory = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [inventoryItems, setInventoryItems] = useState([
    { id: "INV001", name: "Laptop", category: "Electronics", quantity: 20 },
    { id: "INV002", name: "Office Chair", category: "Furniture", quantity: 15 },
    { id: "INV003", name: "Printer", category: "Electronics", quantity: 5 },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>

            {/* Add Inventory Item Button */}
            <button
              onClick={() => router.push("inventory/add-items")}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              + Add Item
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search inventory by name or category..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Item ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(search.toLowerCase()) ||
                      item.category.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{item.id}</td>
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">{item.category}</td>
                      <td className="px-6 py-3">{item.quantity}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => router.push(`/inventory/edit-item/${item.id}`)}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => setInventoryItems(inventoryItems.filter(i => i.id !== item.id))}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Inventory;

'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Sidebar from "../../../components/sidebar/page";
import Footer from "../../../components/welcomePage/Footer/page";

const EditInventoryItem = () => {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id; // Get item ID from URL params

  const [formData, setFormData] = useState({
    id: itemId || "",
    name: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    // TODO: Fetch the item data from backend/API
    const fetchedItem = {
      id: itemId || "",
      name: "Laptop",
      category: "Electronics",
      quantity: "20",
    };
    setFormData(fetchedItem);
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Inventory Item:", formData);
    // TODO: Send updated data to backend/API
    router.push("/inventory"); // Redirect back to Inventory List
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Inventory Item</h1>

          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md">
            <label className="block mb-3">
              Item ID:
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
              />
            </label>

            <label className="block mb-3">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label className="block mb-3">
              Category:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label className="block mb-3">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Save Changes
            </button>
          </form>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EditInventoryItem;

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Footer from "../../../components/welcomePage/Footer/page";
import Sidebar from "../../../components/sidebar/page";

const AddSale = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    product: "",
    customer: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Sale Data:", formData);
    // TODO: Send data to backend/API
    router.push("/sales");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <BusinessOwnerHeader />
      
      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6">Add Sale</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Sale ID:</span>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Product:</span>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Customer:</span>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Amount:</span>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Add Sale
              </button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AddSale;

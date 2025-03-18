'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Sidebar from "../../../components/sidebar/page";
import Footer from "../../../components/welcomePage/Footer/page";

const AddProcess = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    status: "Pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Process Data:", formData);
    // TODO: Send data to backend/API
    router.push("/processes"); // Redirect to Processes list
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Process</h1>

          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg">
            <label className="block mb-3">
              Process ID:
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
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

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Add Process
            </button>
          </form>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddProcess;

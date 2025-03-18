'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Sidebar from "../../../components/sidebar/page";
import Footer from "../../../components/welcomePage/Footer/page";

const CreateEmployee = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Employee Data:", formData);
    // TODO: Send data to backend/API
    router.push("/employees"); // Redirect to Employees list
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Keep Header aligned with Employees Page */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar properly positioned */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Employee</h1>

          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg">
            <label className="block mb-3">
              Employee ID:
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

            <label className="block mb-3">
              Role:
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Create Employee
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEmployee;

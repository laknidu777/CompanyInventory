'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Sidebar from "../../../components/sidebar/page";
import Footer from "../../../components/welcomePage/Footer/page";

const EditEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    // Fetch employee details from API or state management (Mocking for now)
    if (employeeId) {
      setFormData({
        id: employeeId,
        name: "John Doe", // Replace with API response
        role: "Software Engineer", // Replace with API response
      });
    }
  }, [employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Employee Data:", formData);
    // TODO: Send updated data to backend/API
    router.push("/employees"); // Redirect to Employees list
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header aligned properly */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar aligned properly */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Employee</h1>

          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg">
            <label className="block mb-3">
              Employee ID:
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
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
              Update Employee
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default EditEmployee;

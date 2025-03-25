'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditEmployee = () => {
  const router = useRouter();
  const { id, emp_id } = useParams();

  const [formData, setFormData] = useState({
    emp_id: "",
    emp_name: "",
    emp_email: "",
    emp_role: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/business-owners/employees/${emp_id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch employee data");

        const data = await response.json();
        setFormData({
          emp_id: data.emp_id,
          emp_name: data.emp_name,
          emp_email: data.emp_email,
          emp_role: data.emp_role,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };

    if (emp_id) fetchEmployeeData();
  }, [emp_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-owners/employees/${emp_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          emp_name: formData.emp_name,
          emp_email: formData.emp_email,
          emp_role: formData.emp_role,
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      toast.success("✅ Employee updated successfully!", {
        position: "top-right",
        autoClose: 1200,
      });

      setTimeout(() => {
        router.push(`/dashboard/employee/${id}`);
      }, 1300); // slight buffer after toast
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update employee.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading employee data...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Toast container */}
      <ToastContainer />

      <div className="flex flex-1 text-gray-600">
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Employee</h1>

          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg">
            <label className="block mb-3">
              Employee ID:
              <input
                type="text"
                name="emp_id"
                value={formData.emp_id}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
              />
            </label>

            <label className="block mb-3">
              Name:
              <input
                type="text"
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label className="block mb-3">
              Email:
              <input
                type="email"
                name="emp_email"
                value={formData.emp_email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label className="block mb-3">
              Role:
              <input
                type="text"
                name="emp_role"
                value={formData.emp_role}
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
    </div>
  );
};

export default EditEmployee;

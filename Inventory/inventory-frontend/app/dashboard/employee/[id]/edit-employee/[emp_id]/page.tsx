'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { API_BASE_URL } from "../../../../../utils/config";

const EditEmployee = () => {
  const router = useRouter();
  const { id, emp_id } = useParams(); // Extract Business ID & Employee ID

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        console.log("Fetching employee data for ID:", emp_id);
  
        const response = await fetch(`${API_BASE_URL}/api/employees/${emp_id}`, {
          method: "GET",
          credentials: "include",
        });
  
        console.log("API Response Status:", response.status);
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
          throw new Error(errorData.error || "Failed to fetch employee data");
        }
  
        const data = await response.json();
        console.log("Fetched Employee Data:", data);
  
        setFormData({
          name: data.emp_name || "",
          email: data.emp_email || "",
          role: data.emp_role || "",
          password: "",
        });
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Failed to load employee details.");
        setLoading(false);
      }
    };
  
    if (emp_id) {
      fetchEmployee();
    }
  }, [emp_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedData: any = {
        emp_name: formData.name,
        emp_email: formData.email,
        emp_role: formData.role,
      };

      // Only send password if it's changed
      if (formData.password) {
        updatedData.emp_password = formData.password;
      }

      const response = await fetch(`${API_BASE_URL}/api/business-owners/employees/${emp_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update employee");

      router.push(`/dashboard/employee/${id}`);
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit Employee</h1>

        {loading ? (
          <p className="text-center text-gray-700">Loading employee details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password (Optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password if changing"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Update Employee
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditEmployee;

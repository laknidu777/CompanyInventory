'use client';
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployee = () => {
  const router = useRouter();
  const { id } = useParams(); // Business ID from URL
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    emp_name: "",
    emp_email: "",
    emp_password: "",
    emp_role: "",
    designation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions
    setLoading(true); // Start loading

    // **Check if all required fields are filled**
    if (!formData.emp_name || !formData.emp_email || !formData.emp_password || !formData.emp_role) {
      toast.error("All fields are required (except designation).", { position: "top-right" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-owners/${id}/employees`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to create employee");

      toast.success("Employee created successfully!", { position: "top-right" });

      // Redirect after success
      setTimeout(() => {
        router.push(`/dashboard/employee/${id}`);
      }, 2000);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred", { position: "top-right" });
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Employee</h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg">
          <input type="text" name="emp_name" value={formData.emp_name} onChange={handleChange} required placeholder="Name" className="w-full p-2 border mb-3" />
          <input type="email" name="emp_email" value={formData.emp_email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border mb-3" />
          <input type="password" name="emp_password" value={formData.emp_password} onChange={handleChange} required placeholder="Password" className="w-full p-2 border mb-3" />
          <input type="text" name="emp_role" value={formData.emp_role} onChange={handleChange} required placeholder="Role (Admin, Manager, HR, Editor, Viewer)" className="w-full p-2 border mb-3" />
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" className="w-full p-2 border mb-3" />

          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Create Employee"
            )}
          </button>
        </form>
      </main>

      {/* Toast Notifications */}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default CreateEmployee;

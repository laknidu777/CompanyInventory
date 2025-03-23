"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../utils/config"; 
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Footer from "../../../components/welcomePage/Footer/page";

export default function BusinessRegistration() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    business_type: "",
    registration_number: "",
    tax_id: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-owners/create-business`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures cookies are sent
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard/owner"); // ✅ Redirect to dashboard after creation
      } else {
        setError(data.error || "Failed to create business.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="bg-gray-100 shadow-md p-8 rounded-lg w-full max-w-3xl border border-gray-300">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Register New Business</h2>
          <form className="space-y-4 text-gray-700 font-bold" onSubmit={handleSubmit}>
            <div>
              <label className="block">Business Name *</label>
              <input
                type="text"
                name="name"
                className="border p-2 w-full rounded"
                placeholder="Enter business name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block">Business Type *</label>
              <select
                name="business_type"
                className="border p-2 w-full rounded"
                value={formData.business_type}
                onChange={handleChange}
                required
              >
                <option value="">Select a type</option>
                <option value="Buying & Selling">Buying & Selling</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Renting">Renting</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block">Registration Number</label>
                <input
                  type="text"
                  name="registration_number"
                  className="border p-2 w-full rounded"
                  placeholder="Enter registration number"
                  value={formData.registration_number}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="block">Tax ID</label>
                <input
                  type="text"
                  name="tax_id"
                  className="border p-2 w-full rounded"
                  placeholder="Enter tax ID"
                  value={formData.tax_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="border p-2 w-full rounded"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  className="border p-2 w-full rounded"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block">Address</label>
              <input
                type="text"
                name="address"
                className="border p-2 w-full rounded"
                placeholder="Enter business address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between mt-6">
              <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-lg">Cancel</button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg" disabled={loading}>
                {loading ? "Creating..." : "Register Business"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

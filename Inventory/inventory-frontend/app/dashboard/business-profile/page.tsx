'use client';
import { useState } from "react";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Sidebar from "../../components/sidebar/page";

const BusinessProfile = () => {
  // State to manage business and owner information
  const [businessInfo, setBusinessInfo] = useState({
    name: "Acme Corporation",
    type: "Manufacturing",
    registrationNumber: "ACME-2023123",
    address: "123 Business Street, New York, NY",
    contact: "+1 555 123 4567",
    email: "info@acmecorp.com",
  });

  const [ownerInfo, setOwnerInfo] = useState({
    name: "John Doe",
    role: "CEO",
    contact: "+1 555 987 6543",
    email: "john.doe@acmecorp.com",
  });

  // Handle changes in form inputs
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessInfo({ ...businessInfo, [e.target.name]: e.target.value });
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerInfo({ ...ownerInfo, [e.target.name]: e.target.value });
  };

  // Handle form submission (future API integration)
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Business Info:", businessInfo);
    console.log("Updated Owner Info:", ownerInfo);
    // TODO: Send updated info to backend API
    alert("Business Profile Updated Successfully!");
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Business Profile</h1>

          {/* Business & Owner Info Form */}
          <form onSubmit={handleSave} className="bg-gray-100 p-6 rounded-md shadow-md">
            {/* Business Info Section */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
            <label className="block mb-3">
              Business Name:
              <input
                type="text"
                name="name"
                value={businessInfo.name}
                onChange={handleBusinessChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-3">
              Business Type:
              <input
                type="text"
                name="type"
                value={businessInfo.type}
                onChange={handleBusinessChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-3">
              Registration Number:
              <input
                type="text"
                name="registrationNumber"
                value={businessInfo.registrationNumber}
                onChange={handleBusinessChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-3">
              Business Address:
              <input
                type="text"
                name="address"
                value={businessInfo.address}
                onChange={handleBusinessChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-3">
              Contact Number:
              <input
                type="text"
                name="contact"
                value={businessInfo.contact}
                onChange={handleBusinessChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-6">
              Business Email:
              <input
                type="email"
                name="email"
                value={businessInfo.email}
                onChange={handleBusinessChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            {/* Owner Info Section */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Information</h2>
            <label className="block mb-3">
              Owner Name:
              <input
                type="text"
                name="name"
                value={ownerInfo.name}
                onChange={handleOwnerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-3">
              Role:
              <input
                type="text"
                name="role"
                value={ownerInfo.role}
                onChange={handleOwnerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-3">
              Contact Number:
              <input
                type="text"
                name="contact"
                value={ownerInfo.contact}
                onChange={handleOwnerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            <label className="block mb-6">
              Email:
              <input
                type="email"
                name="email"
                value={ownerInfo.email}
                onChange={handleOwnerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>

            {/* Save Button */}
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
export default BusinessProfile;

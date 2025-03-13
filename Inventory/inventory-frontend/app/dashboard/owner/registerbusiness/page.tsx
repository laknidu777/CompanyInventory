"use client";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Footer from "../../../components/welcomePage/Footer/page";
export default function BusinessRegistration() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="bg-gray-100 shadow-md p-8 rounded-lg w-full max-w-3xl border border-gray-300">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Register New Business</h2>
          <form className="space-y-4 text-gray-700 font-bold">
            <div>
              <label className="block ">Business Name *</label>
              <input type="text" className="border p-2 w-full rounded" placeholder="Enter business name" />
            </div>
            <div>
              <label className="block  font-bold">Business Type *</label>
              <select className="border p-2 w-full rounded">
                <option>Select a type</option>
                <option>Technology</option>
                <option>Manufacturing</option>
                <option>Retail</option>
                <option>Consulting</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block  font-bold">Registration Number</label>
                <input type="text" className="border p-2 w-full rounded" placeholder="Enter registration number" />
              </div>
              <div className="flex-1">
                <label className="block  font-bold">Tax ID</label>
                <input type="text" className="border p-2 w-full rounded" placeholder="Enter tax ID" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block  font-bold">Email *</label>
                <input type="email" className="border p-2 w-full rounded" placeholder="Enter email" />
              </div>
              <div className="flex-1">
                <label className="block  font-bold">Phone *</label>
                <input type="text" className="border p-2 w-full rounded" placeholder="Enter phone number" />
              </div>
            </div>
            <div>
              <label className="block  font-bold">Address</label>
              <input type="text" className="border p-2 w-full rounded" placeholder="Enter business address" />
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-lg">Cancel</button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">Register Business</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

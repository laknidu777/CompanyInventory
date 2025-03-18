'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Sidebar from "../../components/sidebar/page";

const Customers = () => {
  const router = useRouter();
  
  const [customers, setCustomers] = useState([
    { id: "CUST001", name: "John Doe", email: "john.doe@example.com", phone: "(123) 456-7890" },
    { id: "CUST002", name: "Jane Smith", email: "jane.smith@example.com", phone: "(234) 567-8901" },
    { id: "CUST003", name: "Alice Johnson", email: "alice.j@example.com", phone: "(345) 678-9012" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BusinessOwnerHeader />
      <div className="flex flex-1 text-gray-700">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <button
              onClick={() => router.push("/customers/add-customer")}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              + Add Customer
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Customer ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{customer.id}</td>
                      <td className="px-6 py-3">{customer.name}</td>
                      <td className="px-6 py-3">{customer.email}</td>
                      <td className="px-6 py-3">{customer.phone}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => router.push(`/customers/edit-customer?id=${customer.id}`)}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(customer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-3 text-center text-gray-500">No customers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Customers;
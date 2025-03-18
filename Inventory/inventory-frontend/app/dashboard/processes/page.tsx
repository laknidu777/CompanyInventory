'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Sidebar from "../../components/sidebar/page";

const Processes = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [processes, setProcesses] = useState([
    { id: "HIRD4723", name: "Completed", status: "In Progress" },
    { id: "P002", name: "In Progress", status: "" },
    { id: "P003", name: "Received", status: "" },
  ]);

  const handleDelete = (id: string) => {
    setProcesses(processes.filter(proc => proc.id !== id));
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Processes</h1>

            {/* Add Process Button */}
            <button
              onClick={() => router.push("processes/add-process")}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              + Add Process
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search product..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Process Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Style Number</th>
                  <th className="px-6 py-3 text-left">Manufacturing</th>
                  <th className="px-6 py-3 text-left">Checking</th>
                  <th className="px-6 py-3 text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                {processes
                  .filter(proc =>
                    proc.name.toLowerCase().includes(search.toLowerCase()) ||
                    proc.id.toLowerCase().includes(search.toLowerCase()) ||
                    proc.status.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((process) => (
                    <tr key={process.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{process.id}</td>
                      <td className="px-6 py-3">{process.name}</td>
                      <td className="px-6 py-3">{process.status}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => router.push(`/processes/edit-process?id=${process.id}`)}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(process.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Processes;

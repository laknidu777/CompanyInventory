'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../../../utils/config";
import 'react-toastify/dist/ReactToastify.css';

interface Pipeline {
  id: string;
  name: string;
  description: string;
  stages?: any[]; // optional for now
  createdAt: string;
}

const ProcessesPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const businessId = Array.isArray(id) ? id[0] : id;
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/pipelines`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch pipelines");
        const data = await res.json();
        setPipelines(data.pipelines || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load pipelines");
      } finally {
        setLoading(false);
      }
    };

    if (businessId) fetchPipelines();
  }, [businessId]);

  const handleDelete = async (pipelineId: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this pipeline?");
      if (!confirm) return;

      const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/pipelines/${pipelineId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Pipeline deleted!");
      setPipelines(prev => prev.filter(p => p.id !== pipelineId));
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete pipeline");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-white text-gray-700 flex flex-col">
      <ToastContainer autoClose={3000} />
      <div className="w-full max-w-6xl mx-auto flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Processes (Pipelines)</h1>
          <Link href={`/dashboard/processes/${businessId}/create`}>
            <button className="bg-gray-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded hover:bg-black w-full sm:w-auto">
              + Create Process
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : pipelines.length === 0 ? (
          <p>No pipelines found.</p>
        ) : (
          <div className="overflow-x-auto w-full">
  <table className="w-full table-auto min-w-full">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="text-left px-4 py-3">Name</th>
        <th className="text-left px-4 py-3 hidden sm:table-cell">Description</th>
        <th className="text-left px-4 py-3 hidden md:table-cell">Created At</th>
        <th className="text-center px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pipelines.map(pipeline => (
        <tr key={pipeline.id} className="border-t hover:bg-gray-50">
          <td className="px-4 py-3 font-medium">
            <div>{pipeline.name}</div>
            <div className="text-sm text-gray-500 sm:hidden">{pipeline.description}</div>
            <div className="text-xs text-gray-400 sm:hidden mt-1">
              {new Date(pipeline.createdAt).toLocaleDateString()}
            </div>
          </td>
          <td className="px-4 py-3 hidden sm:table-cell">{pipeline.description}</td>
          <td className="px-4 py-3 hidden md:table-cell">{new Date(pipeline.createdAt).toLocaleDateString()}</td>
          <td className="px-4 py-3">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => router.push(`/dashboard/processes/${businessId}/view/${pipeline.id}`)}
                className="bg-blue-600 text-white px-2 py-1 text-sm sm:text-base sm:px-3 rounded hover:bg-blue-700"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/dashboard/processes/${businessId}/edit/${pipeline.id}`)}
                className="bg-gray-600 text-white px-2 py-1 text-sm sm:text-base sm:px-3 rounded hover:bg-black"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pipeline.id)}
                className="bg-red-600 text-white px-2 py-1 text-sm sm:text-base sm:px-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        )}
      </div>
    </div>
  );
};

export default ProcessesPage;
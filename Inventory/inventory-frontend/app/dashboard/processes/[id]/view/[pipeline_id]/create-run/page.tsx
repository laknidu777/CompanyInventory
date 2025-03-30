'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../../../../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  type: string;
};

const ITEMS_PER_PAGE = 5;

export default function CreateRunPage() {
  const { pipeline_id } = useParams();
  const router = useRouter();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const businessId = '5'; // Replace or make dynamic

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/businesses/${businessId}/inventory?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(search)}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch items');

        setItems(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [search, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const assignToPipeline = async (itemId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/pipelines/${pipeline_id}/runs`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory_item_id: itemId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to assign item');

      toast.success('✅ Item assigned to pipeline');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || '❌ Failed to assign');
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white text-gray-700">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-6">Assign Inventory to Pipeline</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category..."
          className="border px-3 py-2 rounded-md w-full sm:max-w-xs"
        />
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full rounded-lg border border-gray-300 shadow-md bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 py-3 text-left">Name</th>
                  <th className="px-3 py-3 text-left">Category</th>
                  <th className="px-3 py-3 text-center">Quantity</th>
                  <th className="px-3 py-3 text-center">Type</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3">{item.name}</td>
                      <td className="px-3 py-3">{item.category}</td>
                      <td className="px-3 py-3 text-center">{item.quantity}</td>
                      <td className="px-3 py-3 text-center capitalize">{item.type.replace('-', ' ')}</td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() => assignToPipeline(item.id)}
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-black transition"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-2">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

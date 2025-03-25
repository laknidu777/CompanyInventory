'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  type: string;
};

const ITEMS_PER_PAGE = 5;

export default function InventoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const businessId = Array.isArray(id) ? id[0] : id;

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/businesses/${businessId}/inventory?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(search)}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch inventory");

        const data = await res.json();
        setItems(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load inventory");
      } finally {
        setLoading(false);
      }
    };

    if (businessId) fetchInventory();
  }, [businessId, currentPage, search]);

  const handleEdit = (itemId: string) => {
    router.push(`/dashboard/inventory/${businessId}/edit-items/${itemId}`);
  };

  const confirmDelete = (itemId: string) => {
    setItemToDelete(itemId);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/inventory/${itemToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete item");

      setItems((prev) => prev.filter((item) => item.id !== itemToDelete));
      toast.success("✅ Inventory item deleted successfully", { autoClose: 3000 });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Failed to delete item", { autoClose: 3000 });
    } finally {
      setItemToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // reset pagination on search
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-hidden text-gray-600 relative">
      <ToastContainer />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">Do you really want to delete this inventory item?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header + Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Inventory</h1>
        <Link href={`/dashboard/inventory/${businessId}/add-items`}>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-black transition w-full sm:w-auto">
            + Add Item
          </button>
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:max-w-xs"
        />
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading inventory...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full rounded-lg border border-gray-300 shadow-md bg-white overflow-hidden">
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
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
                      <td className="px-3 py-3 text-center capitalize">{item.type.replace("-", " ")}</td>
                      <td className="px-3 py-3 text-center flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-black transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                        >
                          Delete
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-2">
                Page {currentPage} of {totalPages}
              </span>
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

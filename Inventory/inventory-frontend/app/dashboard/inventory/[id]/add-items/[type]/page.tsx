'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../../../../../utils/config";
import "react-toastify/dist/ReactToastify.css";

interface InventoryFormData {
  name: string;
  category: string;
  unique_number: string;
  quantity: number;
  components: string[];
  description: string;
  type: string;
}

const AddInventoryForm = () => {
  const { id, type } = useParams();
  const router = useRouter();
  const businessId = Array.isArray(id) ? id[0] : id;
  const itemType = (Array.isArray(type) ? type[0] : type) || "";

  const [formData, setFormData] = useState<InventoryFormData>({
    name: "",
    category: "",
    unique_number: "",
    quantity: 1,
    components: [],
    description: "",
    type: itemType,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!["single-item", "item-group", "composite-item"].includes(itemType)) {
      setError("Invalid item type");
    }
  }, [itemType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleComponentChange = (index: number, value: string) => {
    const newComponents = [...formData.components];
    newComponents[index] = value;
    setFormData((prev) => ({ ...prev, components: newComponents }));
  };

  const addComponent = () => {
    setFormData((prev) => ({ ...prev, components: [...prev.components, ""] }));
  };

  const removeComponent = (index: number) => {
    const newComponents = formData.components.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, components: newComponents }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/businesses/${businessId}/inventory`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to add item");

      toast.success("✅ Inventory item added successfully!", {
        position: "top-right",
      });

      setTimeout(() => {
        router.push(`/dashboard/inventory/${businessId}`);
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-white text-gray-700">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          Add {itemType.replace("-", " ")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {itemType === "single-item" && (
            <input
              type="text"
              name="unique_number"
              value={formData.unique_number}
              onChange={handleChange}
              placeholder="e.g. Vehicle No / Serial No"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          )}

          {itemType === "item-group" && (
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          )}

          {itemType === "composite-item" && (
            <>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={1}
                required
                placeholder="Total Quantity"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              />

              <label className="block text-sm font-medium mb-1">Component Items</label>
              <div className="space-y-2">
                {formData.components.map((comp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={comp}
                      onChange={(e) =>
                        handleComponentChange(index, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeComponent(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addComponent}
                  className="text-blue-600 mt-2"
                >
                  + Add Component
                </button>
              </div>
            </>
          )}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <button
            type="submit"
            className={`px-6 py-2 rounded text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Submit Item"
            )}
          </button>
        </form>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AddInventoryForm;

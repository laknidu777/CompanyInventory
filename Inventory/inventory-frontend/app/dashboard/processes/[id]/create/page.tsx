'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { API_BASE_URL } from '../../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePipelinePage() {
  const { id } = useParams(); // business_id
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stages, setStages] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  const handleAddStage = () => {
    setStages([...stages, '']);
  };

  const handleRemoveStage = (index: number) => {
    const updated = stages.filter((_, i) => i !== index);
    setStages(updated);
  };

  const handleStageChange = (index: number, value: string) => {
    const updated = [...stages];
    updated[index] = value;
    setStages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || stages.some(s => !s.trim())) {
      toast.error("Name and all stage names are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/${id}/pipelines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, description, stages }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to create pipeline");

      toast.success("✅ Process pipeline created!");

      setTimeout(() => {
        router.push(`/dashboard/processes/${id}`);
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white text-gray-800">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Create New Process</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        <input
          type="text"
          placeholder="Process Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          rows={3}
        />

        <div>
          <h3 className="font-semibold mb-2">Stages</h3>
          {stages.map((stage, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={stage}
                onChange={(e) => handleStageChange(index, e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 rounded"
                placeholder={`Stage ${index + 1}`}
                required
              />
              {stages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStage(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStage}
            className="text-blue-600 mt-2"
          >
            + Add Stage
          </button>
        </div>

        <button
          type="submit"
          className={`bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Process'}
        </button>
      </form>
    </div>
  );
}

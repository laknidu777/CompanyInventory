'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Stage = {
  id: string;
  stage_name: string;
  sequence_order: number;
};

export default function EditPipelinePage() {
  const router = useRouter();
  const { id: business_id, pipeline_id } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStageName, setNewStageName] = useState('');

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/businesses/${business_id}/pipelines/${pipeline_id}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch pipeline');
        const data = await res.json();

        setName(data.pipeline.name);
        setDescription(data.pipeline.description || '');

        const sortedStages = data.pipeline.stages.sort(
          (a: Stage, b: Stage) => a.sequence_order - b.sequence_order
        );
        setStages(sortedStages);
      } catch (err) {
        console.error(err);
        toast.error('Error loading pipeline');
      } finally {
        setLoading(false);
      }
    };

    if (pipeline_id) fetchPipeline();
  }, [pipeline_id]);

  const handleAddStage = () => {
    if (!newStageName.trim()) {
      toast.error('Stage name is required');
      return;
    }

    const nextSequence = stages.length > 0
      ? Math.max(...stages.map(s => s.sequence_order)) + 1
      : 1;

    const newStage: Stage = {
      id: `temp-${Date.now()}`,
      stage_name: newStageName.trim(),
      sequence_order: nextSequence,
    };

    setStages(prev => [...prev, newStage]);
    setNewStageName('');
    toast.success('✅ Stage added (not saved yet)');
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-white text-gray-800">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Edit Process</h1>

      <div className="space-y-6 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pipeline Name</label>
          <input
            type="text"
            value={name}
            readOnly
            className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            readOnly
            rows={4}
            className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-3">Pipeline Stages</h2>
      <div className="space-y-2 max-w-xl">
        {stages.map((stage) => (
          <div key={stage.id} className="border p-3 rounded bg-gray-50 flex items-center gap-4">
            <span className="text-gray-400 font-semibold w-6">{stage.sequence_order}.</span>
            <span className="text-gray-800">{stage.stage_name}</span>
          </div>
        ))}

        {/* Add New Stage */}
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            placeholder="Enter new stage name"
            className="flex-grow border px-3 py-2 rounded"
          />
          <button
            onClick={handleAddStage}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            + Add Stage
          </button>
        </div>
      </div>
    </div>
  );
}

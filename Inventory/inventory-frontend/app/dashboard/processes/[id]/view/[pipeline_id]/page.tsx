'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '../../../../../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Stage = {
  id: string;
  stage_name: string;
  sequence_order: number;
};

type RunStage = {
  pipeline_stage: Stage;
  status: 'Not Started' | 'In Progress' | 'Completed';
};

type Run = {
  id: string;
  inventory_item: {
    name: string;
  };
  run_stages: RunStage[];
};

type Pipeline = {
  id: string;
  name: string;
  description: string;
  stages: Stage[];
  business_id: number;
};

export default function PipelineViewPage() {
  const { pipeline_id } = useParams();
  const router = useRouter();

  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [runToDelete, setRunToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchPipelineData = async () => {
      try {
        const [pipelineRes, runsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/businesses/5/pipelines/${pipeline_id}`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/api/businesses/5/pipelines/${pipeline_id}/runs`, { credentials: 'include' }),
        ]);

        if (!pipelineRes.ok || !runsRes.ok) throw new Error("Failed to load pipeline or runs");

        const pipelineData = await pipelineRes.json();
        const runData = await runsRes.json();

        pipelineData.pipeline.stages.sort((a: Stage, b: Stage) => a.sequence_order - b.sequence_order);

        setPipeline(pipelineData.pipeline);
        setRuns(runData.runs);
      } catch (err) {
        console.error(err);
        toast.error("Couldn't load pipeline data");
      } finally {
        setLoading(false);
      }
    };

    if (pipeline_id) {
      fetchPipelineData();
    }
  }, [pipeline_id]);

  const handleDeleteRun = async (run_id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/5/pipeline-runs/${run_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to delete run');

      setRuns(prev => prev.filter(r => r.id !== run_id));
      toast.success("✅ Run deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete run.");
    } finally {
      setRunToDelete(null);
    }
  };

  const statusColors: Record<string, string> = {
    'Not Started': 'text-gray-500',
    'In Progress': 'text-yellow-600',
    'Completed': 'text-green-600',
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!pipeline) return <div className="p-6 text-red-500">Couldn't load pipeline</div>;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white text-gray-800">
      <ToastContainer />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{pipeline.name}</h1>
        <p className="text-gray-600">{pipeline.description}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Pipeline Stages */}
        <div className="border rounded-md shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Pipeline Stages</h2>
          </div>
          <div className="max-h-[168px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
            {pipeline.stages.map(stage => (
              <div key={stage.id} className="bg-gray-100 px-3 py-2 rounded">
                {stage.stage_name}
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Items in Progress */}
        <div className="border rounded-md shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Items In Progress</h2>
          <ul className="space-y-2 max-h-[168px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2">
            {runs
              .filter(run => run.run_stages.some(stage => stage.status !== 'Completed'))
              .map(run => (
                <li key={run.id} className="bg-gray-100 px-3 py-2 rounded">
                  {run.inventory_item.name}
                </li>
              ))}
          </ul>
        </div>

        {/* Create Run */}
        <div className="border rounded-md shadow p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-3">Actions</h2>
            <p className="text-sm text-gray-500 mb-4">Add new items to this pipeline</p>
          </div>
          <Link href={`/dashboard/processes/${pipeline.business_id}/view/${pipeline_id}/create-run`}>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              + Create Run
            </button>
          </Link>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">Pipeline Run Progress</h2>
        <table className="min-w-full border border-gray-300 shadow-sm rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left border-b">Item</th>
              {pipeline.stages.map(stage => (
                <th key={stage.id} className="px-4 py-3 text-center border-b">{stage.stage_name}</th>
              ))}
              <th className="px-4 py-3 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(run => (
              <tr key={run.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{run.inventory_item.name}</td>
                {pipeline.stages.map(stage => {
                  const runStage = run.run_stages.find(s => s.pipeline_stage.stage_name === stage.stage_name);
                  const status = runStage?.status || 'Not Started';
                  return (
                    <td key={stage.id} className={`px-4 py-3 text-center font-medium ${statusColors[status]}`}>
                      {status}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center space-x-2">
                  <Link href={`/dashboard/processes/${pipeline.business_id}/view/${pipeline_id}/runs/${run.id}/edit`}>
                    <button className="text-sm text-white bg-gray-600 hover:bg-black rounded px-3 py-1 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setRunToDelete(run.id)}
                    className="text-sm text-white bg-red-600 hover:bg-red-800 rounded px-3 py-1 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {runToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">Do you really want to delete this run?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRunToDelete(null)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRun(runToDelete)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

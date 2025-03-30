'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../../../../../../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type StageStatus = 'Not Started' | 'In Progress' | 'Completed';

interface RunStage {
  id: string;
  stage_id: string;
  status: StageStatus;
  remarks: string | null;
  start_time: string | null;
  end_time: string | null;
  assigned_to: number | null;
  pipeline_stage: {
    stage_name: string;
    sequence_order: number;
  };
}

interface RunData {
  id: string;
  inventory_item: {
    name: string;
  };
  run_stages: RunStage[];
}

export default function EditRunPage() {
  const { pipeline_id, run_id } = useParams();
  const [run, setRun] = useState<RunData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/businesses/5/pipelines/${pipeline_id}/runs/${run_id}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Failed to fetch run');
        const data = await res.json();
        setRun(data.run);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load run');
      } finally {
        setLoading(false);
      }
    };

    if (run_id) fetchRun();
  }, [run_id]);

  const handleStageUpdate = async (stage: RunStage) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/businesses/5/pipeline-runs/${run?.id}/stages/${stage.stage_id}/status`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: stage.status,
            remarks: stage.remarks,
          }),
        }
      );

      if (!res.ok) throw new Error('Failed to update stage');
      toast.success('✅ Stage updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update stage');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!run) return <div className="p-6 text-red-500">Run not found</div>;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white text-gray-800">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Run</h1>
      <p className="text-gray-500 mb-6">Item: {run.inventory_item?.name}</p>

      <div className="space-y-6">
        {run.run_stages
          .sort((a, b) => a.pipeline_stage.sequence_order - b.pipeline_stage.sequence_order)
          .map((stage) => (
            <div
              key={stage.id}
              className="border rounded-md shadow px-4 py-3 flex flex-col gap-3 bg-gray-50"
            >
              <div className="font-semibold text-lg">{stage.pipeline_stage.stage_name}</div>

              {/* Assigned Employee Display */}
              <div className="text-sm text-gray-600">
                Assigned To:{' '}
                <span className="font-medium">
                  {stage.assigned_to ? `Employee ID ${stage.assigned_to}` : '— Not Assigned'}
                </span>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <label className="text-sm font-medium">Status:</label>
                <select
                  value={stage.status}
                  onChange={(e) =>
                    setRun((prev) =>
                      prev
                        ? {
                            ...prev,
                            run_stages: prev.run_stages.map((s) =>
                              s.id === stage.id ? { ...s, status: e.target.value as StageStatus } : s
                            ),
                          }
                        : prev
                    )
                  }
                  className="border rounded px-3 py-1"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Remarks */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Remarks</label>
                <textarea
                  value={stage.remarks || ''}
                  onChange={(e) =>
                    setRun((prev) =>
                      prev
                        ? {
                            ...prev,
                            run_stages: prev.run_stages.map((s) =>
                              s.id === stage.id ? { ...s, remarks: e.target.value } : s
                            ),
                          }
                        : prev
                    )
                  }
                  rows={2}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              {/* Time Display */}
              <div className="text-sm text-gray-600">
                Start Time:{' '}
                <span className="font-medium">
                  {stage.start_time ? new Date(stage.start_time).toLocaleString() : '—'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                End Time:{' '}
                <span className="font-medium">
                  {stage.end_time ? new Date(stage.end_time).toLocaleString() : '—'}
                </span>
              </div>

              {/* Save Button */}
              <button
                onClick={() => handleStageUpdate(stage)}
                className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-max"
              >
                Save Changes
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

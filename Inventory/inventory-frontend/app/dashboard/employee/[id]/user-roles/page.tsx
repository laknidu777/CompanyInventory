'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../../../../utils/config";

type Permissions = {
  [role: string]: {
    [module: string]: {
      [permission: string]: boolean;
    };
  };
};

const AccessControl = () => {
  const router = useRouter();
  const params = useParams();
  const businessId = Number(params.id);

  const roles = ['Admin', 'Manager', 'HR', 'Editor'];
  const modules = [
    'Employees',
    'Inventory',
    'Processes',
    'Sales',
    'Purchases',
    'Income',
    'Reports',
    'Business Profile'
  ];
  const permissionTypes = ['Create', 'Read', 'Update', 'Delete'];

  const getInitialPermissions = (): Permissions => {
    const initial: Permissions = {};
    roles.forEach(role => {
      initial[role] = {};
      modules.forEach(module => {
        initial[role][module] = {};
        permissionTypes.forEach(permission => {
          initial[role][module][permission] = false;
        });
      });
    });
    return initial;
  };

  const [permissions, setPermissions] = useState<Permissions>(getInitialPermissions);
  const [expandedRoles, setExpandedRoles] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/permissions`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch permissions');
        const data = await res.json();

        if (data.permissions) {
          const fullPermissions = getInitialPermissions();

          Object.entries(data.permissions).forEach(([role, modulesObj]) => {
            if (!fullPermissions[role]) return;

            Object.entries(modulesObj as { [key: string]: { [key: string]: boolean } }).forEach(([module, perms]) => {
              if (!fullPermissions[role][module]) return;

              Object.entries(perms).forEach(([permType, value]) => {
                fullPermissions[role][module][permType] = value;
              });
            });
          });

          setPermissions(fullPermissions);
        }
      } catch (err: any) {
        console.error("Permission fetch error:", err);
        setError("Could not load permissions");
      } finally {
        setLoading(false);
      }
    };

    if (businessId) fetchPermissions();
  }, [businessId]);

  const togglePermission = (role: string, module: string, permission: string) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role][module],
          [permission]: !prev[role][module][permission]
        }
      }
    }));
  };

  const toggleAllPermissions = (role: string, module: string, value: boolean) => {
    setPermissions(prev => {
      const updated = { ...prev[role] };
      updated[module] = {};
      permissionTypes.forEach(p => {
        updated[module][p] = value;
      });
      return {
        ...prev,
        [role]: updated
      };
    });
  };

  const togglePermissionForAllModules = (role: string, permission: string, value: boolean) => {
    setPermissions(prev => {
      const updated = { ...prev[role] };
      modules.forEach(module => {
        updated[module] = {
          ...updated[module],
          [permission]: value
        };
      });
      return {
        ...prev,
        [role]: updated
      };
    });
  };

  const toggleRoleExpansion = (role: string) => {
    setExpandedRoles(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/permissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ permissions }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to save permissions");
        return;
      }

      toast.success("Changes saved successfully");
      // Stay on the same page
    } catch (err: any) {
      console.error("Permission save error:", err);
      toast.error("Error saving permissions");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading permissions...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ToastContainer />
      <div className="flex flex-1 text-gray-600">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Access Control Management</h1>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <p className="text-gray-700 mb-4">
              As Super Admin, you can configure which roles have access to different modules and what actions they can perform.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {roles.map(role => (
              <div key={role} className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div
                  className="p-4 bg-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleRoleExpansion(role)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">{role} Permissions</h2>
                  <span className="text-gray-500">
                    {expandedRoles[role] ? '▼' : '▶'}
                  </span>
                </div>

                {expandedRoles[role] && (
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Module</th>
                            {permissionTypes.map(permission => (
                              <th key={permission} className="border border-gray-300 p-2 text-center">
                                <div className="flex flex-col items-center">
                                  <span>{permission}</span>
                                  <label className="inline-flex items-center mt-1">
                                    <input
                                      type="checkbox"
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={modules.every(module => permissions[role][module][permission])}
                                      onChange={(e) =>
                                        togglePermissionForAllModules(role, permission, e.target.checked)
                                      }
                                    />
                                    <span className="ml-1 text-xs">All</span>
                                  </label>
                                </div>
                              </th>
                            ))}
                            <th className="border border-gray-300 p-2 text-center">All</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules.map(module => (
                            <tr key={module} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 font-medium">{module}</td>
                              {permissionTypes.map(permission => (
                                <td key={permission} className="border border-gray-300 p-2 text-center">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    checked={permissions[role][module][permission]}
                                    onChange={() => togglePermission(role, module, permission)}
                                  />
                                </td>
                              ))}
                              <td className="border border-gray-300 p-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-5 w-5 text-blue-600"
                                  checked={permissionTypes.every(permission => permissions[role][module][permission])}
                                  onChange={(e) => toggleAllPermissions(role, module, e.target.checked)}
                                  title="Select/deselect all permissions for this module"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin-dashboard')}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 text-white rounded-md ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AccessControl;

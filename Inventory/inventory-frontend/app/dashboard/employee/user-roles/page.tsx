'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BusinessOwnerHeader from '../../../components/BusinessOwner/Header/page';
import Sidebar from '../../../components/sidebar/page';
import Footer from '../../../components/welcomePage/Footer/page';

const AccessControl = () => {
  const router = useRouter();

  // Define all available roles
  const roles = ['Admin', 'Manager', 'HR', 'Editor'];
  
  // Define all modules that can have permissions assigned
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

  // Define all permission types
  const permissionTypes = ['Create', 'Read', 'Update', 'Delete'];
  
  // Initialize permissions state - structure: { [role]: { [module]: { [permission]: boolean } } }
  const [permissions, setPermissions] = useState<{ [role: string]: { [module: string]: { [permission: string]: boolean } } }>(() => {
    const initialState: { [role: string]: { [module: string]: { [permission: string]: boolean } } } = {};
    
    roles.forEach(role => {
      initialState[role] = {};
      modules.forEach(module => {
        initialState[role][module] = {};
        permissionTypes.forEach(permission => {
          initialState[role][module][permission] = false;
        });
      });
    });
    
    return initialState;
  });

  // Function to handle changes to permissions
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

  // Function to select/deselect all permissions for a specific role and module
  const toggleAllPermissions = (role: string, module: string, value: boolean) => {
    setPermissions(prev => {
      const updatedRole = { ...prev[role] };
      updatedRole[module] = {};
      
      permissionTypes.forEach(permission => {
        updatedRole[module][permission] = value;
      });
      
      return {
        ...prev,
        [role]: updatedRole
      };
    });
  };

  // Function to select/deselect a specific permission across all modules for a role
  const togglePermissionForAllModules = (role: string, permission: string, value: boolean) => {
    setPermissions(prev => {
      const updatedRole = { ...prev[role] };
      
      modules.forEach(module => {
        updatedRole[module] = {
          ...updatedRole[module],
          [permission]: value
        };
      });
      
      return {
        ...prev,
        [role]: updatedRole
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Access Control:', permissions);
    // TODO: Send updated access settings to the backend/API
    router.push('/admin-dashboard');
  };

  // Show/hide permission matrix for each role
  const [expandedRoles, setExpandedRoles] = useState<{ [key: string]: boolean }>({});

  const toggleRoleExpansion = (role: string) => {
    setExpandedRoles(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BusinessOwnerHeader />
      <div className="flex flex-1 text-gray-600">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Access Control Management</h1>
            <button 
              type="button" 
              onClick={() => router.push('/admin-dashboard')}
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
                                  <div className="mt-2">
                                    <label className="inline-flex items-center">
                                      <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                        onChange={(e) => togglePermissionForAllModules(role, permission, e.target.checked)}
                                        checked={modules.every(module => permissions[role][module][permission])}
                                        title={`Select/deselect ${permission} for all modules`}
                                      />
                                      <span className="ml-1 text-xs">All</span>
                                    </label>
                                  </div>
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
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AccessControl;
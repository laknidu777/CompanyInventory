'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Employee = {
  emp_id: number;
  emp_name: string;
  emp_email: string;
  emp_role: string;
  designation?: string;
};

export default function EmployeesPage() {
  const { id } = useParams();
  const router = useRouter();
  const businessId = Array.isArray(id) ? id[0] : id;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const EMPLOYEES_PER_PAGE = 5;

  // Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [empToDelete, setEmpToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/business-owners/${businessId}/employees?page=${currentPage}&limit=${EMPLOYEES_PER_PAGE}`,
          { method: "GET", credentials: "include" }
        );
        if (!response.ok) throw new Error("Unauthorized or no employees found");

        const data = await response.json();
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    if (businessId) {
      fetchEmployees();
    }
  }, [businessId, currentPage]);

  const handleEdit = (emp_id: number) => {
    router.push(`/dashboard/employee/${businessId}/edit-employee/${emp_id}`);
  };

  const confirmDelete = (emp_id: number) => {
    setEmpToDelete(emp_id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!empToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-owners/employees/${empToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setEmployees((prev) => prev.filter((emp) => emp.emp_id !== empToDelete));
      toast.success("✅ Employee deleted successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("❌ Failed to delete employee.", { autoClose: 3000 });
    } finally {
      setShowConfirmModal(false);
      setEmpToDelete(null);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-hidden text-gray-600 relative">
      <ToastContainer />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">Do you really want to delete this employee?</p>
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Employees</h1>
        <Link href={`/dashboard/employee/${businessId}/create-employee`}>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-black transition w-full sm:w-auto">
            + Create Employee
          </button>
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full rounded-lg border border-gray-300 shadow-md bg-white overflow-hidden">
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-3 text-left">Employee ID</th>
                  <th className="px-3 py-3 text-left">Name</th>
                  <th className="px-3 py-3 text-left">Email</th>
                  <th className="px-3 py-3 text-left">Role</th>
                  <th className="px-3 py-3 text-left">Designation</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.emp_id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3">{employee.emp_id}</td>
                      <td className="px-3 py-3">{employee.emp_name}</td>
                      <td className="px-3 py-3">{employee.emp_email}</td>
                      <td className="px-3 py-3">{employee.emp_role}</td>
                      <td className="px-3 py-3">{employee.designation || "N/A"}</td>
                      <td className="px-3 py-3 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(employee.emp_id)}
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-black transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(employee.emp_id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No employees found
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

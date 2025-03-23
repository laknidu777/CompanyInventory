'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../../../utils/config";

type Employee = {
  emp_id: number;
  emp_name: string;
  emp_email: string;
  emp_role: string;
  designation?: string;
};

export default function EmployeesPage() {
  const { id } = useParams(); // Business ID from URL
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const EMPLOYEES_PER_PAGE = 5;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/business-owners/${id}/employees?page=${currentPage}&limit=${EMPLOYEES_PER_PAGE}`,
          { method: "GET", credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Unauthorized or no employees found");
        }

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

    if (id) {
      fetchEmployees();
    }
  }, [id, currentPage]);

  const handleEdit = (emp_id: number) => {
    router.push(`/dashboard/employee/${id}/edit-employee/${emp_id}`);
  };

  return (
    <div className="flex-1 p-8 overflow-hidden text-gray-600">
      {/* Header Section with Title & Create Employee Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href={`/dashboard/employee/${id}/create-employee`}>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-black transition">
            + Create Employee
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="border border-gray-300 rounded-lg shadow-md bg-white p-4">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Employee ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Designation</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.emp_id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{employee.emp_id}</td>
                    <td className="px-4 py-3">{employee.emp_name}</td>
                    <td className="px-4 py-3">{employee.emp_email}</td>
                    <td className="px-4 py-3">{employee.emp_role}</td>
                    <td className="px-4 py-3">{employee.designation || "N/A"}</td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(employee.emp_id)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-black transition"
                      >
                        Edit
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
      )}
    </div>
  );
}

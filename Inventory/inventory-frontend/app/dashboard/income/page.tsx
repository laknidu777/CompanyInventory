'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Footer from "../../components/welcomePage/Footer/page";
import Sidebar from "../../components/sidebar/page";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Income = () => {
  const router = useRouter();

  // Dummy Income Data
  const [incomeData, setIncomeData] = useState([
    { date: "2025-03-01", amount: 1200 },
    { date: "2025-03-05", amount: 900 },
    { date: "2025-03-10", amount: 1500 },
    { date: "2025-03-15", amount: 1800 },
    { date: "2025-03-20", amount: 1100 },
    { date: "2025-03-25", amount: 2200 },
  ]);

  // Date Filter States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter income data by selected date range
  const filteredData = incomeData.filter((income) => {
    const incomeDate = new Date(income.date);
    return (!startDate || new Date(startDate) <= incomeDate) &&
           (!endDate || new Date(endDate) >= incomeDate);
  });

  // Calculate Total Income
  const totalIncome = filteredData.reduce((sum, record) => sum + record.amount, 0);

  // Prepare Chart Data
  const chartData = {
    labels: filteredData.map((income) => income.date),
    datasets: [
      {
        label: "Income ($)",
        data: filteredData.map((income) => income.amount),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Generate PDF Report
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Income Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Date", "Amount ($)"]],
      body: filteredData.map((income) => [income.date, income.amount]),
    });
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.text(`Total Income: $${totalIncome}`, 14, finalY + 10);
    doc.save("Income_Report.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Income</h1>

          {/* Date Filters */}
          <div className="flex space-x-4 mb-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded-md"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded-md"
            />
            <button onClick={downloadPDF} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Download PDF
            </button>
          </div>

          {/* Total Income Display */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-900">Total Income: ${totalIncome}</h2>
          </div>

          {/* Income Chart */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Income Trend</h2>
            <Line data={chartData} />
          </div>

          {/* Income Table */}
          <div className="overflow-x-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Income Records</h2>
            <table className="min-w-full border border-gray-200 rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((income, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{income.date}</td>
                    <td className="px-6 py-3">${income.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Income;

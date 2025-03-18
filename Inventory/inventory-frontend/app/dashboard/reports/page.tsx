'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../components/BusinessOwner/Header/page";
import Sidebar from "../../components/sidebar/page";
import Footer from "../../components/welcomePage/Footer/page";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const doc = new jsPDF();
autoTable(doc, {});

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Reports = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Dummy Report Data
  const reportData = [
    { id: "REP001", date: "2024-03-01", revenue: 5000, expenses: 2000, profit: 3000 },
    { id: "REP002", date: "2024-03-05", revenue: 7000, expenses: 3000, profit: 4000 },
    { id: "REP003", date: "2024-03-10", revenue: 8000, expenses: 2500, profit: 5500 },
    { id: "REP004", date: "2024-03-15", revenue: 10000, expenses: 4000, profit: 6000 },
    { id: "REP005", date: "2024-03-20", revenue: 12000, expenses: 5000, profit: 7000 },
  ];

  // Filter Data by Date Range
  const filteredData = reportData.filter((report) => {
    const reportDate = new Date(report.date);
    return (
      (!startDate || reportDate >= new Date(startDate)) &&
      (!endDate || reportDate <= new Date(endDate))
    );
  });

  // Prepare Data for Charts
  const chartData = {
    labels: filteredData.map((data) => data.date),
    datasets: [
      {
        label: "Revenue",
        data: filteredData.map((data) => data.revenue),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Expenses",
        data: filteredData.map((data) => data.expenses),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Profit",
        data: filteredData.map((data) => data.profit),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  // Scatter Plot Data
  const scatterData = {
    datasets: [
      {
        label: "Revenue vs Expenses",
        data: filteredData.map((data) => ({ x: data.revenue, y: data.expenses })),
        backgroundColor: "purple",
      },
    ],
  };

  // Download PDF Report
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Business Report", 14, 15);

    const tableColumn = ["ID", "Date", "Revenue", "Expenses", "Profit"];
    const tableRows: (string | number)[][] = [];

    filteredData.forEach((report) => {
      const reportRow = [report.id, report.date, report.revenue, report.expenses, report.profit];
      tableRows.push(reportRow);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("report.pdf");
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

            {/* Download Button */}
            <button
              onClick={downloadPDF}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Download PDF
            </button>
          </div>

          {/* Date Filters */}
          <div className="flex space-x-4 mb-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Report ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Revenue</th>
                  <th className="px-6 py-3 text-left">Expenses</th>
                  <th className="px-6 py-3 text-left">Profit</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((report) => (
                  <tr key={report.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{report.id}</td>
                    <td className="px-6 py-3">{report.date}</td>
                    <td className="px-6 py-3">${report.revenue}</td>
                    <td className="px-6 py-3">${report.expenses}</td>
                    <td className="px-6 py-3">${report.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-2">Revenue, Expenses & Profit (Line Chart)</h2>
              <Line data={chartData} />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-2">Revenue vs Expenses (Scatter Plot)</h2>
              <Scatter data={scatterData} />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Reports;

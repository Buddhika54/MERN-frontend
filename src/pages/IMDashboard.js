import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Bar, Doughnut } from "react-chartjs-2";
import { getDashboardStats } from "../services/api";
import "./IMDashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Global defaults for Chart.js
ChartJS.defaults.color = "#fff"; // White labels
ChartJS.defaults.plugins.legend.labels.color = "#fff";

const IMDashboard = () => {
  const [stats, setStats] = useState({
    totalInventory: 0,
    lowStockItems: 0,
    pendingReorders: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats({
          totalInventory: res.data.totalInventory || 0,
          lowStockItems: res.data.lowStockItems || 0,
          pendingReorders: res.data.pendingReorders || 0,
          totalSales: res.data.totalSales || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchStats();
  }, []);

  const barData = {
    labels: ["Green Tea", "Black Tea", "Oolong", "Herbal"],
    datasets: [
      {
        label: "Stock Level",
        data: [
          stats.totalInventory / 4,
          stats.totalInventory / 4,
          stats.totalInventory / 4,
          stats.totalInventory / 4,
        ],
        backgroundColor: ["#4caf50", "#81c784", "#a5d6a7", "#c8e6c9"],
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ["Green Tea", "Black Tea", "Oolong", "Herbal"],
    datasets: [
      {
        label: "Sales",
        data: [
          stats.totalSales / 4,
          stats.totalSales / 4,
          stats.totalSales / 4,
          stats.totalSales / 4,
        ],
        backgroundColor: ["#2e7d32", "#4caf50", "#81c784", "#c8e6c9"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>

      <div className="cards-container">
        <Card title="Total Inventory" value={stats.totalInventory} />
        <Card title="Low Stock Items" value={stats.lowStockItems} warning />
        <Card title="Pending Reorders" value={stats.pendingReorders} />
        <Card title="Total Sales" value={stats.totalSales} />
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Stock Levels by Tea Type</h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
              scales: {
                x: { ticks: { color: "#fff" } },
                y: { ticks: { color: "#fff" } },
              },
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Monthly Sales Distribution</h3>
          <Doughnut
            data={pieData}
            options={{
              cutout: "50%",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: "#fff" } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IMDashboard;

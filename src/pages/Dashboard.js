import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import api from '../services/api';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    summary: {
      totalItems: 0,
      lowStockItems: 0,
      totalValue: 0,
      recentTransactions: 0
    },
    stockByCategory: [],
    topItemsByValue: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard/analytics');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chart configurations
  const stockLevelsData = {
    labels: dashboardData.stockByCategory.map(item => item._id || 'Unknown'),
    datasets: [
      {
        label: 'Stock Levels',
        data: dashboardData.stockByCategory.map(item => item.totalStock),
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(33, 150, 243, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const stockLevelsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#666',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
        },
      },
    },
  };

  const salesDistributionData = {
    labels: ['Green Tea', 'Black Tea', 'Oolong', 'Herbal'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(33, 150, 243, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const salesDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#666',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-content">
            <h3>Total Inventory</h3>
            <div className="card-value">{dashboardData.summary.totalItems}</div>
          </div>
        </div>
        
        <div className="card card-warning">
          <div className="card-content">
            <h3>Low Stock Items</h3>
            <div className="card-value">{dashboardData.summary.lowStockItems}</div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <h3>Pending Reorders</h3>
            <div className="card-value">0</div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <h3>Total Sales</h3>
            <div className="card-value">0</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Stock Levels by Tea Type</h3>
          </div>
          <div className="chart-container">
            <Bar data={stockLevelsData} options={stockLevelsOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Monthly Sales Distribution</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color green"></span>Green Tea
              </span>
              <span className="legend-item">
                <span className="legend-color blue"></span>Black Tea
              </span>
              <span className="legend-item">
                <span className="legend-color yellow"></span>Oolong
              </span>
              <span className="legend-item">
                <span className="legend-color purple"></span>Herbal
              </span>
            </div>
          </div>
          <div className="chart-container">
            <Doughnut data={salesDistributionData} options={salesDistributionOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simuler un appel API
      const response = await new Promise(resolve => setTimeout(() => resolve({
        visitors: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          data: [150, 230, 180, 290, 200, 180, 140]
        },
        pageViews: {
          labels: ['Accueil', 'Blog', 'Produits', 'Contact'],
          data: [45, 25, 20, 10]
        },
        devices: {
          labels: ['Desktop', 'Mobile', 'Tablet'],
          data: [60, 30, 10]
        }
      }), 1000));

      setData(response);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!data) return null;

  const visitorsConfig = {
    labels: data.visitors.labels,
    datasets: [{
      label: 'Visiteurs',
      data: data.visitors.data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const pageViewsConfig = {
    labels: data.pageViews.labels,
    datasets: [{
      label: 'Vues par page',
      data: data.pageViews.data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ]
    }]
  };

  const devicesConfig = {
    labels: data.devices.labels,
    datasets: [{
      data: data.devices.data,
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)'
      ]
    }]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="day">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full lg:col-span-2">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Visiteurs</h3>
            <Line data={visitorsConfig} options={{ responsive: true }} />
          </div>
        </div>

        <div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Appareils</h3>
            <Doughnut data={devicesConfig} options={{ responsive: true }} />
          </div>
        </div>

        <div className="col-span-full">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Pages vues</h3>
            <Bar data={pageViewsConfig} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Total Visiteurs</h4>
          <p className="text-2xl font-bold text-green-900">
            {data.visitors.data.reduce((a, b) => a + b, 0)}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Pages / Session</h4>
          <p className="text-2xl font-bold text-blue-900">2.5</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Taux de rebond</h4>
          <p className="text-2xl font-bold text-purple-900">35%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';

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

const DashboardAnalytics = ({ siteId }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [siteId, timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Simuler un appel API
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const mockData = generateMockData(days);
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (days) => {
    const dates = Array.from({ length: days }, (_, i) => 
      format(subDays(new Date(), i), 'dd/MM', { locale: fr })
    ).reverse();

    return {
      visitors: {
        labels: dates,
        datasets: [{
          label: 'Visiteurs',
          data: Array.from({ length: days }, () => Math.floor(Math.random() * 1000)),
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
        }]
      },
      pageViews: {
        labels: dates,
        datasets: [{
          label: 'Pages vues',
          data: Array.from({ length: days }, () => Math.floor(Math.random() * 2000)),
          backgroundColor: '#4F46E5',
        }]
      },
      devices: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          data: [55, 35, 10],
          backgroundColor: [
            '#4F46E5',
            '#10B981',
            '#F59E0B',
          ],
        }]
      }
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">90 derniers jours</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Visiteurs</h3>
          <Line
            data={analyticsData.visitors}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pages vues</h3>
          <Bar
            data={analyticsData.pageViews}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appareils</h3>
          <div className="w-64 mx-auto">
            <Doughnut
              data={analyticsData.devices}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Total Visiteurs</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">
              {analyticsData.visitors.datasets[0].data.reduce((a, b) => a + b, 0)}
            </dd>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Total Pages Vues</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">
              {analyticsData.pageViews.datasets[0].data.reduce((a, b) => a + b, 0)}
            </dd>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Temps Moyen</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">
              2m 45s
            </dd>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Taux de Rebond</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">
              45.2%
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;

import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { FaSun, FaMoon } from 'react-icons/fa';


// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const StatisticsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    jobs: { labels: [], datasets: [] },
    applications: { labels: [], datasets: [] },
    users: { labels: [], datasets: [] }
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchUsers();
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8000/jobs'); // Endpoint for jobs
      const data = await response.json();
      
      setChartData(prevData => ({
        ...prevData,
        jobs: {
          labels: data.labels,
          datasets: [{
            label: 'Jobs Created',
            data: data.data,
            borderColor: isDarkMode ? '#E5E7EB' : '#1F2937',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2
          }]
        }
      }));
    } catch (error) {
      console.error('Error fetching jobs data:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:8000/applications'); // Endpoint for applications
      const data = await response.json();

      setChartData(prevData => ({
        ...prevData,
        applications: {
          labels: data.labels,
          datasets: [{
            label: 'Applications Received',
            data: data.data,
            backgroundColor: isDarkMode ? '#1F2937' : '#E5E7EB',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
        }
      }));
    } catch (error) {
      console.error('Error fetching applications data:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/users'); // Endpoint for users
      const data = await response.json();

      setChartData(prevData => ({
        ...prevData,
        users: {
          labels: data.labels,
          datasets: [{
            label: 'Users Registered',
            data: data.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        }
      }));
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="text-xl p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="mb-6">
        {/* <img src={image} alt="Dashboard" className="w-full h-auto rounded-lg shadow-md" /> */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Jobs Created</h2>
          <div className="h-64">
            <Line data={chartData.jobs} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Applications Received</h2>
          <div className="h-64">
            <Bar data={chartData.applications} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Users Registered</h2>
          <div className="h-64">
            <Pie data={chartData.users} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataVisualizer = ({ jobsData }) => {
    const jobCategories = jobsData.map(job => job.category);
    const jobTitles = jobsData.map(job => job.title);

    const chartData = {
        labels: jobCategories,
        datasets: [
            {
                label: 'Number of Jobs per Category',
                data: jobTitles.map(() => 1), // Count each job as 1 for each category
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Job Distribution by Category',
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default DataVisualizer;

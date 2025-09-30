import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ title, data, type = 'line', color = 'primary' }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: `rgb(${color === 'primary' ? '59, 130, 246' : '239, 68, 68'})`,
        backgroundColor: `rgba(${color === 'primary' ? '59, 130, 246' : '239, 68, 68'}, 0.1)`,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default Chart;

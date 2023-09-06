import React from 'react';
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
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Spending Trends',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Current',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(0, 128, 0)', // Deep Green (RGB: 0, 128, 0)
      backgroundColor: 'rgba(144, 238, 144, 0.5)', // Light Green (RGB: 144, 238, 144)
    },
    {
      label: 'Previous',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 0, 0)', // Red (RGB: 255, 0, 0)
      backgroundColor: 'rgba(255, 0, 0, 0.5)', 
    },
  ],
};


const MonthlySavingsChart = () => {
  return (
    <div>
      <h6>Monthly Savings vs. Previous Spending</h6>
       <Line options={options} data={data} />;
    </div>
  );
};

export default MonthlySavingsChart;

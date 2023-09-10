import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Monthly CPU Usage by IP Address',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const generateRandomData = () => {
  return labels.map(() => faker.datatype.number({ min: 0, max: 100 }));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'IP Address 1',
      data: generateRandomData(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'IP Address 2',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    // Add more IP addresses and data as needed
  ],
};

const MonthlyCPUUsage = () => {
  return (
    <Card>
      <Card.Body>
        <Bar options={options} data={data} />
      </Card.Body>
    </Card>
  );
};

export default MonthlyCPUUsage;

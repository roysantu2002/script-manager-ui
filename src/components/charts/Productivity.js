import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from 'react-bootstrap/Card';
ChartJS.register(ArcElement, Tooltip, Legend);

export const productivity = {
  labels: ['Efficiency', 'Productivity'],
  datasets: [
    {
      label: '# Time',
      data: [80, 20],
      backgroundColor: ['rgba(173, 216, 230, 0.2)', 'rgba(255, 192, 203, 0.2)'],
      borderColor: ['rgba(173, 216, 230, 1)', 'rgba(255, 192, 203, 1)'],
      borderWidth: 1,
    },
  ],
};

const Productivity = () => {
  return (
    <Card >
    <Card.Body>
      <h6>Productivity</h6>
      <Doughnut data={productivity} />
    </Card.Body>
    </Card>
  );
};

export default Productivity;

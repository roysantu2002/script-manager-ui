import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from 'react-bootstrap/Card';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Consistency', 'Quality'],
  datasets: [
    {
      label: '# Time',
      data: [80, 20],
      backgroundColor: ['rgba(92, 184, 92, 0.2)', 'rgba(0, 166, 90, 0.2)'],
      borderColor: ['rgba(0, 166, 90, 1)', 'rgba(92, 184, 92, 1)'],
      borderWidth: 1,
    },
  ],
};


const Consistency = () => {
  return (
    <Card >
    <Card.Body>
      <h6>Consistency, Quality</h6>
      <Pie data={data} />
    </Card.Body>
    </Card>
  );
};

export default Consistency;

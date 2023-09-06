import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';


import Card from 'react-bootstrap/Card';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: ['Network', 'Interfaces', 'Connectivity', 'Router', 'Firewall', 'Protocol'],
  datasets: [
    {
      label: '#Execution Frequency',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const ExecutionFrequency = () => {
    return(
        <Card >
        <Card.Body>
   <Radar data={data} />
   </Card.Body>
   </Card>
    )
}

export default ExecutionFrequency;
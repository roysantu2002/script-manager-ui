import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import MonthlySavings from "../charts/MonthlySavings"
import ExecutionFrequency from "../charts/ExecutionFrequency"


ChartJS.register(ArcElement, Tooltip, Legend);

const savingsData = {
  labels: ['UI Savings', 'No UI Savings'],
  datasets: [
    {
      label: 'Savings',
      data: [1500, 800],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Savings Over Time',
      data: [100, 200, 300, 400, 500, 600],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    },
  ],
};


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



const HomeDash = () => {
    return (
        <Container>
      <Row>
        <Col md={4} sm={12}>
        <Card >
            <Card.Body>
          
              <Doughnut data={data} />
              {/* <Bar data={data.savingsData} options={options} /> */}
            </Card.Body>
          </Card>
        </Col>

  <Col md={4} sm={12}>
        <MonthlySavings/>
        </Col>

        {/* <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <h1>Script Execution Savings</h1>
              <Doughnut data={savingsData} />
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <h1>Line Chart</h1>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col> */}
        <Col md={4} sm={12}>
          <Card >
            <Card.Body>
              <Pie data={productivity} />
            </Card.Body>
          </Card>
        </Col>

        {/* Add more columns here if needed */}
      </Row>
      <Row>
        <Col md={4} sm={6}>
            <ExecutionFrequency/>
        </Col>
      </Row>
    </Container>
      );
    };

export default HomeDash;

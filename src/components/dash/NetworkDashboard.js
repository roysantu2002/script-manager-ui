import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const sampleData = [
  {
    id: 1,
    name: "Script 1",
    status: "Running",
  },
  {
    id: 2,
    name: "Script 2",
    status: "Completed",
  },
  {
    id: 3,
    name: "Script 3",
    status: "Failed",
  },
  // Add more script data as needed
];

const NetworkDashboard = () => {
  return (
    <Container>
      <Row>
        {sampleData.map((script) => (
          <Col key={script.id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{script.name}</Card.Title>
                <Card.Text>Status: {script.status}</Card.Text>
                <Button variant='primary'>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NetworkDashboard;

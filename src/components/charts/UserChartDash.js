import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PassedFailed from './PassedFailed';
import ExecutionFrequency from './ExecutionFrequency';
import ScriptsDevices from './ScriptsDevices';
import MonthlyCPUUsage from './MonthlyCPUUsage';

const ChartDash = () => {
  return (
    <Container>
     
      <Row className='m-3'>
        <Col md={6} sm={12}>
          <PassedFailed />
        </Col>
        <Col md={6} sm={12}>
          <MonthlyCPUUsage/>
        </Col>
     
    
      </Row>
      <Row className='m-3'>
      <Col md={6} sm={12}>
        <ExecutionFrequency />
        </Col>

        <Col md={6} sm={12}>
          <ScriptsDevices />
        </Col>
      
      </Row>
    </Container>
  );
};

export default ChartDash;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PassedFailed from './PassedFailed';
import ExecutionFrequency from './ExecutionFrequency';
import MonthlySavings from './MonthlySavings';
import ScriptsDevices from './ScriptsDevices';
import Productivity from './Productivity';
import Consistency from './Consistency';

const ChartDash = () => {
  return (
    <Container>
     
      <Row className='m-3'>
        <Col md={4} sm={12}>
          <PassedFailed />
        </Col>
        <Col md={4} sm={12}>
          <ExecutionFrequency />
        </Col>
        <Col md={4} sm={12}>
          <Consistency />
        </Col>
    
      </Row>
      <Row className='m-3'>
        <Col md={4} sm={12}>
          <ScriptsDevices />
        </Col>
        <Col md={4} sm={12}>
          <Productivity />
        </Col>
        <Col md={4} sm={12}>
          <MonthlySavings />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartDash;

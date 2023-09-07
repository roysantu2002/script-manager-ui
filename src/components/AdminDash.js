// components/Layout.js
import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import DeviceLog from '../components/features/DeviceLog'
import Hosts from '../components/features/Hosts'
import RunAll from '../components/features/RunAll'
import ChartDash from '../components/charts/ChartDash'
import Audit from '../components/features/Audit'



const AdminDash = () => {
  const [selectedComponent, setSelectedComponent] = useState('DeviceStatus');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Quickview':
        return <ChartDash />;
      case 'DeviceLog':
        return <DeviceLog />;
      case 'Hosts':
        return <Hosts />;
      case 'RunAll':
        return <RunAll />;
      case 'Audit':
        return <Audit />;

      default:
        return <ChartDash />;
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Admindash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setSelectedComponent('Quickview')}>Quickview</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('DeviceLog')}>DeviceLog</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('Hosts')}>Hosts</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('RunAll')}>RunAll</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('Audit')}>Audit</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">{renderComponent()}</div>
    </div>
  );
}

export default AdminDash;

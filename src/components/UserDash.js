// components/Layout.js
import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import DeviceLog from '../components/features/DeviceLog'
import Hosts from '../components/features/Hosts'
import RunAll from '../components/features/RunAll'


const UserDash = () => {
  const [selectedComponent, setSelectedComponent] = useState('DeviceStatus');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'DeviceLog':
        return <DeviceLog />;
      case 'Hosts':
        return <Hosts />;
      case 'RunAll':
        return <RunAll />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Network Support Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setSelectedComponent('DeviceLog')}>DeviceLog</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('Hosts')}>Hosts</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('RunAll')}>Script Execution</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">{renderComponent()}</div>
    </div>
  );
}

export default UserDash;

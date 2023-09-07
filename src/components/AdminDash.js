// components/Layout.js
import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import DeviceLog from '../components/features/DeviceLog'
import Hosts from '../components/features/Hosts'
import RunAll from '../components/features/RunAll'

import MonthlySavings from "../components/charts/MonthlySavings"
import ExecutionFrequency from "../components/charts/ExecutionFrequency"
import PassedFailed from "../components/charts/PassedFailed"
import ScriptsDevices from "../components/charts/ScriptsDevices"


const AdminDash = () => {
  const [selectedComponent, setSelectedComponent] = useState('DeviceStatus');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'DeviceLog':
        return <DeviceLog />;
      case 'Hosts':
        return <Hosts />;
      case 'RunAll':
        return <RunAll />;
      case 'MonthlySavings':
        return <MonthlySavings />;
      case 'ExecutionFrequency':
        return <ExecutionFrequency />;
      case 'PassedFailed':
        return <PassedFailed />;
      case 'ScriptsDevices':
        return <ScriptsDevices />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Admindash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setSelectedComponent('DeviceLog')}>DeviceLog</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('Hosts')}>Hosts</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('RunAll')}>RunAll</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('RunAll')}>MonthlySavings</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('RunAll')}>PassedFailed</Nav.Link>
            <Nav.Link onClick={() => setSelectedComponent('RunAll')}>ScriptsDevices</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">{renderComponent()}</div>
    </div>
  );
}

export default AdminDash;

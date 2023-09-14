// components/Layout.js
import React, { useState } from 'react';
import DeviceLog from '../components/features/DeviceLog';
import Hosts from '../components/features/Hosts';
import Scripts from '../components/features/Scripts';
import RunAll from '../components/features/RunAll';
import ChatApp from '../components/chat/ChatApp';
import { FaComment } from 'react-icons/fa';
import UserChartDash from '../components/charts/UserChartDash';
import ScriptTemplate from '../components/features/ScriptTemplate';
import styles from './dash.module.css'; // Import the CSS module
import { MdEdit } from 'react-icons/md';

const UserDash = () => {
  // const [selectedComponent, setSelectedComponent] = useState('DeviceStatus');
  const [selectedComponent, setSelectedComponent] = useState('QuickView');

  const handleTabClick = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'QuickView':
        return <UserChartDash />;
      case 'DeviceLog':
        return <DeviceLog />;
      case 'Scripts':
        return <Scripts />;
      case 'Hosts':
        return <Hosts />;
      case 'RunAll':
        return <RunAll />;
      case 'Chat':
        return <ChatApp />; // Render the Chat component when selected
      case 'ScriptTemplate':
        return <ScriptTemplate />; // Render the Chat component when selected
      default:
        return <UserChartDash />;
    }
  };

  return (
    <div className="container">
      <div
        className={`${styles.navbarContainer}`}
        style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}
      >
        <button
          className={`nav-link ${
            selectedComponent === 'QuickView' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('QuickView')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          QuickView
        </button>
        <button
          className={`nav-link ${
            selectedComponent === 'Scripts' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('Scripts')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          Scripts
        </button>
        <button
          className={`nav-link ${
            selectedComponent === 'DeviceLog' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('DeviceLog')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          DeviceLog
        </button>
        <button
          className={`nav-link ${
            selectedComponent === 'Hosts' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('Hosts')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          Hosts
        </button>
        <button
          className={`nav-link ${
            selectedComponent === 'RunAll' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('RunAll')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          Script Execution
        </button>
        <button
          className={`nav-link ${selectedComponent === 'Chat' ? 'active' : ''}`}
          onClick={() => handleTabClick('Chat')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          <FaComment /> Chat
        </button>
        <button
          className={`nav-link ${
            selectedComponent === 'Template' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('ScriptTemplate')}
          style={{ marginRight: '10px' }} // Adjust the value as needed
        >
          <MdEdit /> Template
        </button>
      </div>
      <div className={styles.contentContainer}>{renderComponent()}</div>
    </div>
  );
};
export default UserDash;

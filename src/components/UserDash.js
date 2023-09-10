// components/Layout.js
import React, { useState } from 'react';
import DeviceLog from '../components/features/DeviceLog'
import Hosts from '../components/features/Hosts'
import RunAll from '../components/features/RunAll'
import ChatApp from '../components/chat/ChatApp'
import { FaComment } from 'react-icons/fa';
import UserChartDash from "../components/charts/UserChartDash"
import styles from './dash.module.css'; // Import the CSS module


const UserDash = () => {
  const [selectedComponent, setSelectedComponent] = useState('DeviceStatus');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'QuickView':
        return <UserChartDash />;
      case 'DeviceLog':
        return <DeviceLog />;
      case 'Hosts':
        return <Hosts />;
      case 'RunAll':
        return <RunAll />;
      case 'Chat':
        return <ChatApp />; // Render the Chat component when selected
      default:
        return <UserChartDash />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbar}>
          <button onClick={() => setSelectedComponent('QuickView')}>QuickView</button>
          <button onClick={() => setSelectedComponent('DeviceLog')}>DeviceLog</button>
          <button onClick={() => setSelectedComponent('Hosts')}>Hosts</button>
          <button onClick={() => setSelectedComponent('RunAll')}>Script Execution</button>
          <button onClick={() => setSelectedComponent('Chat')}>
            <FaComment /> Chat
          </button>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {renderComponent()}
      </div>
    </div>
  );
}

export default UserDash;

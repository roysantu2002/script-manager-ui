// components/Sidebar.js
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faNetworkWired, faFileCode } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.css'; // Import the CSS module

const Sidebar = () => {
  return (
    <nav id="sidebar" className={`bg-light ${styles.sidebar}`}>
      <div className="p-4">
        <ul className={`list-unstyled ${styles.ul}`}>
          <li className={styles.li}>
            <Link href="/dashboard" legacyBehavior>
              <a className={styles.a}>
                <FontAwesomeIcon icon={faCog} className={`icon ${styles.icon}`} />
                Dashboard
              </a>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/network-devices" legacyBehavior>
              <a className={styles.a}>
                <FontAwesomeIcon icon={faNetworkWired} className={`icon ${styles.icon}`} />
                Network Devices
              </a>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/scripts" legacyBehavior>
              <a className={styles.a}>
                <FontAwesomeIcon icon={faFileCode} className={`icon ${styles.icon}`} />
                Scripts
              </a>
            </Link>
          </li>
          {/* Add more navigation options as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

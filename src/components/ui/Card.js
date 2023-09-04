import { useRouter } from "next/router";
import React from "react";
import {
  FaCode,
  FaFileAlt,
  FaHistory,
  FaPlayCircle,
  FaSearch,
  FaServer,
} from "react-icons/fa";

const getIconComponent = (iconName) => {
  switch (iconName) {
    case "FaHistory":
      return <FaHistory className='icon' />;
    case "FaPlayCircle":
      return <FaPlayCircle className='icon' />;
    case "FaCode":
      return <FaCode className='icon' />;
    case "FaFileAlt":
      return <FaFileAlt className='icon' />;
    case "FaSearch":
      return <FaSearch className='icon' />;
    case "FaServer":
      return <FaServer className='icon' />;
    default:
      return null; // You can handle this case as needed
  }
};

const Card = ({ id, title, description, icon }) => {
  const router = useRouter();
  const handleFeatureClick = (id) => {
    try {
      const route = `/features/${id}`;
      router.push(route);
    } catch (error) {
      // Handle errors if necessary
    }
  };
  return (
    <div className='card m-3'>
      <div
        key={id}
        onClick={() => handleFeatureClick(id)}
        style={{ cursor: "pointer" }}
      >
        <div className='card-content'>
          <div className='card-header'>
            <h2>{title}</h2>
            <div className='icons'>{getIconComponent(icon)}</div>
          </div>
          <p>{description}</p>
        </div>
      </div>
      <style jsx>{`
        // ... Your existing styles

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icons {
          display: flex;
          gap: 10px;
        }

        .icon {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default Card;

// components/ScriptCard.js
import React from 'react';
import axiosInstance from "../../utils/axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import the icons you want to use

const ScriptCard = ({ script }) => {
    const [scripts, setScripts] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
        setLoading(true);
        axiosInstance
          .get("/scripts/script-list/")
          .then((response) => {
            // Assuming the response data is an array of devices
            setScripts(response.data);
            setLoading(false);
          })
    
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

//   logs.forEach((log) => {
//     const deviceId = log.device_id;
//     const createdAt = moment(log.created_at);

//     if (
//       !latestLogs[deviceId] ||
//       createdAt.isAfter(latestLogs[deviceId].createdAt)
//     ) {
//       latestLogs[deviceId] = {
//         createdAt,
//         logData: log.log_data,
//         ipAddress: log.ip_address,
//       };
//     }
//   });

const ScriptCard = ({ script }) => {
    const isActive = script.status === 'active';
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{script.name}</h5>
          <p className="card-text">{script.description}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Author:</strong> {script.author}
            </li>
            <li className="list-group-item">
              <strong>Version:</strong> {script.version}
            </li>
            <li className="list-group-item">
              <strong>Execution Frequency:</strong> {script.execution_frequency}
            </li>
            <li className="list-group-item">
            <strong>Status:</strong> {isActive ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
          </li>
          </ul>
        </div>
      </div>
    );
  };

  
   return (
    <div className="container">
   
      {loading ? (
        // Show the Bootstrap spinner while loading
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {scripts.map((script) => (
            <div className="col-md-4" key={script.id}>
              <ScriptCard script={script} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default ScriptCard;

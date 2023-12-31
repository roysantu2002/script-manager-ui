import React, { useEffect, useState } from "react";
import { FaCircle, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import axiosInstance from "../../utils/axios";

const Hosts = ({ data }) => {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({});

  const handleAction = (deviceId) => {
    sendWebSocketMessage("run");

    console.log(deviceId);
    const updatedStatus = { ...deviceStatus }; // Create a copy of the current deviceStatus
    const currentStatus = updatedStatus[deviceId];

    // Update the deviceStatus based on the current status
    if (currentStatus === "running") {
      updatedStatus[deviceId] = "stopped";
      // Perform "Stop" action for the device with the given deviceId
      stopDevice(deviceId);
    } else if (currentStatus === "paused") {
      updatedStatus[deviceId] = "running";
      // Perform "Run" action for the device with the given deviceId
      runDevice(deviceId);
    }

    setDeviceStatus(updatedStatus); // Update deviceStatus state
  };

  const stopDevice = (deviceId) => {
    // Perform the "Stop" action for the device with the given deviceId
    // You can make an API request or update the device state here
    console.log(`Stopping device with ID ${deviceId}`);
  };

  const runDevice = (deviceId) => {
    // Perform the "Run" action for the device with the given deviceId
    // You can make an API request or update the device state here
    console.log(`Running device with ID ${deviceId}`);
  };

  const sendWebSocketMessage = (messageText) => {
    // Create a WebSocket message with the specified message text
    const message = {
      message: messageText,
    };

    // Replace 'yourWebSocketEndpoint' with the actual WebSocket endpoint
    const socket = new WebSocket(
      "ws://192.168.1.103:8000/ws/scriptchat/run_script/"
    );

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
      // No need to close the socket immediately
    };
  };
  //   console.log(`${axiosInstance}/scripts/network-devices/list/}`);
  useEffect(() => {
    // Fetch data from the API using the Axios instance
    axiosInstance
      .get("/scripts/network-devices/list/")
      .then((response) => {
        // Assuming the response data is an array of devices
        setDeviceList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(deviceList);

  return (
    <div className='table-responsive'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>IP</th>
            <th>Host Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((device) => (
            <tr key={device.id}>
              <td>{device.ip_address}</td>
              <td>{device.host_name}</td>
              <td>
                {device.status ? (
                  <span className='text-success'>
                    <FaCircle />
                  </span>
                ) : (
                  <span className='text-danger'>
                    <FaCircle />
                  </span>
                )}
              </td>
              <td className="d-flex gap-2">
                <span>
                  <FaPlus />
                </span>
                <span>
                  <FaEdit />
                </span>
                <span className='text-danger'>
                  <FaTrash />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hosts;

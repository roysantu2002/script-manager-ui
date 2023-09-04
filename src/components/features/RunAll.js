import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axios";

const RunAll = ({ data }) => {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({});
  const [selectedDevices, setSelectedDevices] = useState([]);

  const handleCheckboxChange = (device) => {
    if (
      selectedDevices.find((selectedDevice) => selectedDevice.id === device.id)
    ) {
      setSelectedDevices(
        selectedDevices.filter(
          (selectedDevice) => selectedDevice.id !== device.id
        )
      );
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };

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
    const message = {
      message: messageText,
    };
    const socket = new WebSocket(
      "ws://192.168.1.103:8000/ws/scriptchat/run_script/"
    );

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
  };

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

  console.log(selectedDevices);

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
              <td>
                <td>
                  {device.status ? (
                    <input
                      type='checkbox'
                      onChange={() => handleCheckboxChange(device)}
                      checked={
                        selectedDevices.find(
                          (selectedDevice) => selectedDevice.id === device.id
                        ) !== undefined
                      }
                    />
                  ) : (
                    <input type='checkbox' disabled />
                  )}
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='d-flex justify-content-center'>
        <button
          className={`action-button w-50 m-auto justify-content-center ${
            selectedDevices.length === 0 ? "" : "text-success"
          }`}
          disabled={selectedDevices.length === 0}
        >
          <FontAwesomeIcon icon={faPlay} />
          Action
        </button>
      </div>
    </div>
  );
};

export default RunAll;

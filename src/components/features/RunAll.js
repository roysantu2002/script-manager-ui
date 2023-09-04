import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axios";

const RunAll = ({ data }) => {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({});
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [execution, setExecution] = useState(false);

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

  const handleAction = () => {
    sendWebSocketMessage("run");
  };

  const handleStop = () => {
    setLoading(false);
    setExecution(false);
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
    setExecution(true);
    console.log(messageText);
    const message = {
      message: messageText,
    };

    try {
      const socket = new WebSocket(
        "ws://192.168.1.103:8000/ws/scriptchat/run_script/"
      );

      socket.onopen = () => {
        socket.send(JSON.stringify(message));
      };

      socket.onmessage = (event) => {
        // const receivedData = event.data;
        // // You can parse the data if it's in JSON format
        // const response = JSON.parse(receivedData);

        // if (response && response.message.toLowerCase().includes("executed")) {
        //   setExecution(false);
        // }
        try {
          const receivedData = event.data;
          // You can parse the data if it's in JSON format
          const parsedData = JSON.parse(receivedData);

          // Now you can work with the received data
          console.log("Received data:", parsedData);

          // You can access specific properties from the received data
          const message = parsedData.message;
          console.log("Received message:", message);
          if (message.toLowerCase().includes("executed")) {
            setExecution(false);
          }

          // Add your custom logic to handle the received message here
        } catch (error) {
          console.error("Error while processing the received data:", error);
          // Handle the error gracefully, e.g., by setting some default values or displaying an error message to the user.
        }
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        // Handle WebSocket close event if needed
        // You can add additional logic here
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        // Handle WebSocket error if needed
        // You can add additional error handling logic here
      };
    } catch (error) {
      console.error("WebSocket connection error:", error);
      // Handle any exceptions that occur during WebSocket setup
      // You can add additional error handling logic here
      setExecution(false); // Ensure that 'execution' is set to false in case of an exception
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/scripts/network-devices/list/")
      .then((response) => {
        // Assuming the response data is an array of devices
        setDeviceList(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(selectedDevices);

  return (
    <div className='table-responsive'>
      {loading ? (
        // Show the Bootstrap spinner while loading
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
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
                              (selectedDevice) =>
                                selectedDevice.id === device.id
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
          <div className='d-flex justify-content-center border-1 shadow-sm'>
            <button
              className={`btn action-button w-50 m-auto justify-content-center ${
                selectedDevices.length === 0 ? "" : "text-success"
              }`}
              disabled={execution}
              onClick={() => handleAction()}
            >
              {execution ? (
                <div className='spinner-border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlay} />
                  <span> Run </span>
                </>
              )}
            </button>
            <button
              className='btn action-button w-50 m-auto justify-content-center'
              onClick={() => handleStop()}
            >
              {" "}
              <FontAwesomeIcon icon={faStop} /> Stop
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RunAll;

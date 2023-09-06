import {
  faPlay,
  faStop,
  faExclamationTriangle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, useState } from "react";
import { FaCircle } from 'react-icons/fa';
import axiosInstance from '../../utils/axios';

import lottie from "lottie-web"; // Import Lottie
import animationData from "../../../public/wait.json"

const RunAll = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({});
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [execution, setExecution] = useState(false);
  const animationContainerRef = useRef(null);

  const [socket, setSocket] = useState(null); // Store the WebSocket instance here
  const [run, setRun] = useState(false); // Store the WebSocket instance here
  const socketUrl = 'ws://192.168.1.103:8000/ws/scriptchat/run_script/';


  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: "svg", // or "canvas" or "html"
      loop: true,
      autoplay: true, // Automatically play the animation when the modal opens
      animationData: animationData, // Replace with your animation JSON data
    });

    return () => {
      animation.destroy();
    };
  }, []); // Re-run the effect when the modal is shown or hidden



  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/scripts/network-devices/list/')
      .then((response) => {
        // Assuming the response data is an array of devices
        setDeviceList(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const establishWebSocketConnection = (url, onMessageCallback) => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      // WebSocket is open, you can send initial messages here if needed
    };

    socket.onmessage = (event) => {
      const receivedData = event.data;
      const parsedData = JSON.parse(receivedData);

      if (parsedData) {
        onMessageCallback(parsedData);
      }
    };

    socket.onclose = (event) => {
      // console.log('WebSocket connection closed:', event);
    };

    socket.onerror = (error) => {
      // console.error('WebSocket error:', error);
    };

    return socket;
  };

  useEffect(() => {
    const message = {
      /* your message data here */
    };

    const newSocket = establishWebSocketConnection(socketUrl, (data) => {
      try {
  

        // const receivedData = data;
        // const parsedData = JSON.parse(receivedData);

        // // The received data is valid JSON
        // // You can work with the parsedData here
        // // ...

        if (!data || typeof data.message === 'undefined') {
          console.error('Invalid message format:', data);
          return;
        }

        const message = data.message;
        console.log('Received message:', message);

        // // Now you can work with the received data
        // console.log("Received data:", parsedData);

        // You can access specific properties from the received data
        // const message = parsedData.message;
        // console.log("Received message:", message);

        const str_message = String(message); // Ensure message is a string
        // console.log(str_message);

        //complted received
        if (message.includes("alldone")) {
          console.log("Message alldone 'completed'.");
          setExecution(false);
          if (socket) {
                socket.close();
              }
      } 

        // // Split the received message by ', ' to extract components
        const components = str_message.split(', ');

        // console.log(components)

        // Check if the components array has the expected format
        if (components.length === 3) {
          const [status, scriptName, ipAddress] = components;

          // Update the state with the extracted components
          setMessages((prevMessages) => {
            // Check if an item with the same scriptName and ipAddress already exists in the array
            const isDuplicate = prevMessages.some((message) => {
              return (
                message.scriptName === scriptName &&
                message.ipAddress === ipAddress
              );
            });

            if (!isDuplicate) {
              // If it's not a duplicate, add the new item to the array
              return [...prevMessages, { status, scriptName, ipAddress }];
            }

            // If it's a duplicate, update the status for the existing item and don't modify the array structure
            return prevMessages.map((message) => {
              if (
                message.scriptName === scriptName &&
                message.ipAddress === ipAddress
              ) {
                return { ...message, status };
              }
              return message;
            });
          });
          // if (status === "start") {
          //   // Set executionData to the received data
          //   setExecutionData({ status, scriptName, ipAddress });
          // }
        } else {
          console.error('Invalid message format:', message);
        }
      } catch (error) {
        console.error('Error while processing the received data:', error);
        // Handle the error gracefully, e.g., by setting some default values or displaying an error message to the user.
      }
    });

    setSocket(newSocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []); // Run this effect only once during component mounting

  // useEffect(() => {
  //   // ... (your other code)

  //   // Determine if all statuses are "done"
  //   const allDone = messages.every(
  //     (messageData) => messageData.status === 'done',
  //   );

  //   // Set setExecution to false if all statuses are "done"
  //   setExecution(!allDone);
  // }, [messages]);

  //stop the execution 

  // useEffect(() => {
  //   // Check if messages is empty; if so, return early without further execution

  //   if (messages.length === 0) {
  //     return;
  //   }
  
  //   // ... (your other code)
  
  //   // Filter messages that have "done" status
  //   const doneMessages = messages.filter(
  //     (messageData) => messageData.status === 'done'
  //   );
  
  //   // Check if the count of selected devices matches the count of "done" messages,
  //   // or use the length of deviceList if selectedDevices is empty
  //   const allDone = selectedDevices.length === 0
  //     ? doneMessages.length === deviceList.length
  //     : doneMessages.length === selectedDevices.length;
  
  //   // Set setExecution to false if counts match
  //   setExecution(!allDone);
  // }, [messages, selectedDevices, deviceList]);



  const handleCheckboxChange = (device) => {
    const { id, ip_address } = device; // Extract the id and ip_address properties
  
    if (selectedDevices.find((selectedDevice) => selectedDevice.id === id)) {
      setSelectedDevices(
        selectedDevices.filter(
          (selectedDevice) => selectedDevice.id !== id,
        ),
      );
    } else {
      setSelectedDevices([...selectedDevices, { id, ip_address }]);
    }
  };

  // useEffect(() => {
  //   // Add WebSocket event listener for incoming messages
  //   const handleWebSocketMessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     const { message } = data;

  //     // Check the message and set the corresponding state
  //     let newState;
  //     if (message.includes("Executing")) {
  //       newState = "executing";
  //     } else if (message.includes("Finished executing")) {
  //       newState = "done";
  //     } else {
  //       newState = "ready";
  //     }

  //     // Update the messages state with the new message and state
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { message, state: newState },
  //     ]);
  //   };

  //   // Add event listener to WebSocket connection
  //   yourWebSocketConnection.addEventListener("message", handleWebSocketMessage);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     yourWebSocketConnection.removeEventListener(
  //       "message",
  //       handleWebSocketMessage
  //     );
  //   };
  // }, [yourWebSocketConnection]); // Replace with your WebSocket connection

  // const handleCheckboxChange = (device) => {
  //   if (
  //     selectedDevices.find((selectedDevice) => selectedDevice.id === device.id)
  //   ) {
  //     setSelectedDevices(
  //       selectedDevices.filter(
  //         (selectedDevice) => selectedDevice.id !== device.id,
  //       ),
  //     );
  //   } else {
  //     setSelectedDevices([...selectedDevices, device]);
  //   }
  // };

  const handleAction = () => {
    setMessages([]);
    // console.log("setting run")
    // setRun(true);
    // setExecution(true);
    sendWebSocketMessage('run');
  };

  const handleStop = () => {
    sendWebSocketMessage('stop');
    setSelectedDevices([])
    setSocket(null)
    setLoading(false);
    setExecution(false);
    setMessages([]);
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

  // Now, you can use the 'socket' variable in your 'sendWebSocketMessage' function
  const sendWebSocketMessage = (messageText) => {

    // const newSocket = establishWebSocketConnection(socketUrl, (data) => {

    setExecution(true);
    // console.log(messageText);

    const activeDeviceList = deviceList.filter(device => device.status === true);

    // Extract the IP addresses from the filtered activeDeviceList
    const activeDeviceIPs = activeDeviceList.map(device => device.ip_address);

    // console.log(activeDeviceIPs)

    const message = {
      message: selectedDevices.length > 0 ? selectedDevices : activeDeviceIPs,
    };

    // const message = {
    //   message: selectedDevices.length > 0 ? selectedDevices : deviceList,
    // };
    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify(message));
      } catch (error) {
        // console.error('Error while sending WebSocket message:', error);
        // Handle any exceptions that occur during message sending
        setExecution(false); // Ensure that 'execution' is set to false in case of an exception
      }
    } else {
      // console.error('WebSocket connection not established.');
      // Handle the case where the WebSocket connection is not available
      setExecution(false); // Ensure that 'execution' is set to false
    }

  };

  // const sendWebSocketMessage = (messageText) => {
  //   setExecution(true);
  //   console.log(messageText);

  //   const message = {
  //     message: messageText,
  //   };

  //   try {
  //     const socket = new WebSocket(
  //       "ws://192.168.1.103:8000/ws/scriptchat/run_script/"
  //     );

  //     socket.onopen = () => {
  //       socket.send(JSON.stringify(message));
  //     };

  //     socket.onmessage = (event) => {
  //       // const receivedData = event.data;
  //       // // You can parse the data if it's in JSON format
  //       // const response = JSON.parse(receivedData);

  //       // if (response && response.message.toLowerCase().includes("executed")) {
  //       //   setExecution(false);
  //       // }
  //       try {
  //         const receivedData = event.data;
  //         // You can parse the data if it's in JSON format
  //         const parsedData = JSON.parse(receivedData);

  //         // Now you can work with the received data
  //         // console.log("Received data:", parsedData);

  //         // // You can access specific properties from the received data
  //         const message = parsedData.message;
  //         // console.log("Received message:", message);
  //         if (message.toLowerCase().includes("executed")) {
  //           setExecution(false);
  //         }

  //         // Add your custom logic to handle the received message here
  //       } catch (error) {
  //         console.error("Error while processing the received data:", error);
  //         // Handle the error gracefully, e.g., by setting some default values or displaying an error message to the user.
  //       }
  //     };

  //     // socket.onclose = (event) => {
  //     //   console.log("WebSocket connection closed:", event.code, event.reason);
  //     //   // Handle WebSocket close event if needed
  //     //   // You can add additional logic here
  //     // };

  //     socket.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //       // Handle WebSocket error if needed
  //       // You can add additional error handling logic here
  //     };
  //   } catch (error) {
  //     console.error("WebSocket connection error:", error);
  //     // Handle any exceptions that occur during WebSocket setup
  //     // You can add additional error handling logic here
  //     setExecution(false); // Ensure that 'execution' is set to false in case of an exception
  //   }
  // };


  return (
    <div className="table-responsive">
      {loading ? (
        // Show the Bootstrap spinner while loading
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table table-bordered">
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
                      <span className="text-success">
                        <FaCircle />
                      </span>
                    ) : (
                      <span className="text-danger">
                        <FaCircle />
                      </span>
                    )}
                  </td>

                  <td>
                    {device.status ? (
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(device)}
                        checked={
                          selectedDevices.find(
                            (selectedDevice) => selectedDevice.id === device.id,
                          ) !== undefined
                        }
                      />
                    ) : (
                      <input type="checkbox" disabled />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center border-1 custom-round-button">
            {/* <button
              className={`btn action-button w-50 m-auto justify-content-center ${
                selectedDevices.length === 0 ? "" : "text-success"
              }`}
              disabled={execution}
              onClick={() => handleAction()}
            >
         
                  <FontAwesomeIcon icon={faPlay} />
                  <span> Run </span>
          
            </button> */}

            {/* <button
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
            </button> */}

            {execution && messages ? (
              <button
                className="btn btn-sm custom-round-button"
                onClick={() => handleStop()}
              >
                {' '}
                <FontAwesomeIcon icon={faStop} className="text-danger" /> Stop
              </button>
            ) : (
              <button
                className="btn-primary me-md-2 custom-round-button"
                disabled={execution && messages}
                onClick={() => handleAction()}
              >
                <FontAwesomeIcon icon={faPlay} />
                <span> Run </span>
              </button>
            )}
          </div>
        </>
      )}

      <>
        {messages.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Status</th>
                <th>Script Name</th>
                <th>IP Address</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {messages.map((messageData, index) => (
                <tr key={index}>
                  <td>
                    {messageData.status === 'start' ? (
                      <span className="text-warning">
                        <FontAwesomeIcon icon={faExclamationTriangle} /> Ready
                      </span>
                    ) : messageData.status === 'stop' ? (
                      <span className="text-warning">
                        <FontAwesomeIcon icon={faStop} /> Stop
                      </span>
                    ) : messageData.status === 'done' ? (
                      <span className="text-info">
                        <FontAwesomeIcon icon={faCheckCircle} /> Done
                      </span>
                    ) : (
                      <span className="text-success">
                      <FontAwesomeIcon icon={faCheckCircle} /> 
                    </span>
                    )}
                  </td>
                  <td>{messageData.scriptName}</td>
                  <td>{messageData.ipAddress}</td>
                  {/* <td> */}
                  {/* Add your action buttons or elements here */}
                  {/* Example: */}
                  {/* <button className="btn btn-primary">View Details</button> */}
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
          ref={animationContainerRef}
          style={{ width: "100%", height: "300px" }} // Adjust the dimensions as needed
        />
        )}
      </>
    </div>
  );
};

export default RunAll;

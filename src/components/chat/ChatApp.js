
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { FaComment } from 'react-icons/fa';
import { FaCircleNotch } from 'react-icons/fa';
import styles from './chat.module.css'; // Import the CSS module
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import stringSimilarity from 'string-similarity';
import axiosInstance from '../../utils/axios';
import GenericTable from '../GenericTable'

const channelName = 'scripts'; // Replace with the actual channel nam
const socketUrl = `ws://localhost:8000/ws/netgeni/scripts/?channel=${channelName}`;

const textMessages= `Hello! I'm your network assistance AI, ready to assist you with executing scripts, crafting basic Python code, or helping you discover and run available scripts. 
Whether you need to automate tasks, troubleshoot networking issues, or learn Python, I'm here to support you. Just let me know how I can assist you today!`

// findBestMatch = (userQuestion, questions) => {
//   const similarities = stringSimilarity.findBestMatch(userQuestion, questions);
//   const bestMatch = similarities.bestMatch;

//   // Check if the best match has a similarity score greater than a certain threshold
//   if (bestMatch.rating >= 0.6) {
//     return bestMatch.target;
//   }

//   return null;
// };


const ChatWindow = ({ messages, chatWindowRef }) => {
  // Function to scroll the chat window to the bottom
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // Scroll to the bottom whenever new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`container-fluid h-100 ${styles['chat-window']}`} ref={chatWindowRef}>
      <div className="row justify-content-center h-100">
        <div className="card contacts_card bg-black">
        {messages.map((messageObject, index) => {
  let messageContent;

  try {
    // Attempt to access the message and response properties
    const message = messageObject.message;
    const response = messageObject.response;

    // Check if the "response" property is an object with specific properties
    if (response && typeof response === 'object') {
      const property1 = response.property1;
      const property2 = response.property2;

      // Render the properties as needed
      messageContent = (
        <div>
          <div>{message}</div>
       
        </div>
      );
    } else {
      // Handle cases where "response" is not an object
      messageContent = (
        <div>
          <div>{message}</div>
          {/* <div>Invalid response format</div> */}
        </div>
      );
    }
  } catch (error) {
    // Handle exceptions that may occur during rendering
    console.error('Error rendering message:', error);
    messageContent = (
      <div>
        <div>Error rendering message</div>
      </div>
    );
  }

  return (
    <div key={index} className="message text-white">
      {messageContent}
    </div>
  );
})}
          {/* {typingText && (
            <div className="message typing-message text-white">{typingText}</div>
          )} */}
        </div>
      </div>
    </div>
  );
};


const ChatApp = () => {
  const chatWindowRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [connecting, setConnecting] = useState(true);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [clearMessages, setClearMessages] = useState(false); // State to control clearing messages
  const [script, setScript] = useState(null); // State to control clearing messages
  const [scriptList, setScriptList] = useState([]); // State to control clearing messages
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  // Callback function for handling checkbox changes
  const handleCheckboxChange = (item) => {
    // Toggle selection when the checkbox is clicked
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...prevSelectedItems, item]
    );
  };

  // Callback function for handling "Run" button click
  const handleRunButtonClick = () => {
    // Handle the "Run" button click event here
    console.log('Selected items:', selectedItems);
  };

  useEffect(() => {
    if (script && script.length > 4) { // Check if script is longer than 4 characters
      console.log(script)
      setLoading(true);
      axiosInstance
      .get('/scripts/script-list/')
      .then((response) => {
        const fetchedScripts = response.data;

      // Split the script into words
      const scriptWords = script.toLowerCase().split(' ');

      // Filter the scriptList based on word similarity
      const filteredScripts = fetchedScripts.filter((scriptItem) => {
        const nameWords = scriptItem.name.toLowerCase().split(' ');
        const descriptionWords = scriptItem.description.toLowerCase().split(' ');

        // Calculate similarity scores for each word
        const nameSimilarities = nameWords.map((word) =>
          scriptWords.map((scriptWord) =>
            stringSimilarity.compareTwoStrings(scriptWord, word)
          )
        );
        const descriptionSimilarities = descriptionWords.map((word) =>
          scriptWords.map((scriptWord) =>
            stringSimilarity.compareTwoStrings(scriptWord, word)
          )
        );

        // Check if any word similarity is above the threshold
        const similarityThreshold = 0.6; // You can adjust this threshold as needed
        return (
          nameSimilarities.some(
            (similarities) =>
              similarities.some((similarity) => similarity >= similarityThreshold)
          ) ||
          descriptionSimilarities.some(
            (similarities) =>
              similarities.some((similarity) => similarity >= similarityThreshold)
          )
        );
      });

      setScriptList(filteredScripts);
      setScript(null)

        // Assuming the response data is an array of scripts with a "message" property
        // Filter the scriptList based on whether script is included in item.name
        // const filteredScripts = fetchedScripts.filter((item) =>
        //   item.name.includes(script)
        // );

        // setScriptList(filteredScripts);

        // // Set the script state based on the result
        // setScript(matchingScript ? matchingScript.message : null);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }, [script]); // Run the effect when the script state changes

  console.log(scriptList)


  const [typingText, setTypingText] = useState(''); // Text being typed

  const handleClearMessages = () => {
    setMessages([]); // Clear messages by setting the state to an empty array
  };

  useEffect(() => {
    // Simulate a delay for establishing the WebSocket connection
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 3000); // Adjust the delay as needed
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
    setScript(null)
    // Establish the WebSocket connection
    const newSocket = establishWebSocketConnection(socketUrl, (message) => {
      // Handle incoming messages and add them to the state
      if (!message || typeof message.message === 'undefined') {
        console.error('Invalid message format:', message);
        return;
      }

      const messageText = message.message;
      if (messageText.includes('NetGeni') && !messageText.includes('don')) {
        const index = messageText.indexOf("NetGeni:");
        const scriptMessage = messageText.substring(index + 8).trim()
        setScriptList([])
        setScript(scriptMessage)
      } else{setScriptList([])}
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Handle connection events
    newSocket.onopen = () => {
      setConnecting(false); // Once connected, set connecting to false
    };

    newSocket.onclose = () => {
      setConnecting(true); // If disconnected, set connecting to true
    };

    setSocket(newSocket);

    // Cleanup when component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };

  }, [inputText. messages]);

  // Simulate typing effect
  useEffect(() => {
    if (connected) {
      let currentIndex = 0;
      // const textToType = 'This is a long text that keeps typing...';
      const typingInterval = 100; // Adjust typing speed (milliseconds)

      const typingTimer = setInterval(() => {
        if (currentIndex < textMessages.length) {
          setTypingText(textMessages.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingTimer);
        }
      }, typingInterval);

      return () => {
        clearInterval(typingTimer);
      };
    }
  }, [connected]);


  const sendMessage = () => {

   
    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        // Send user's message to the backend
        socket.send(JSON.stringify({ message: inputText }));
        // Clear input field
        setInputText("");
      } else {
        console.error("WebSocket is not open.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle the error here, e.g., show an error message to the user
    }
  };
  // Render the chat window and input field
  // ...

  return (

    <div className={`container mt-4 ${styles.chatContainer}`}>
    {scriptList && scriptList.length > 1 && 
    <GenericTable
    data={scriptList}
    selectedItems={selectedItems}
    onCheckboxChange={handleCheckboxChange}
    onRunButtonClick={handleRunButtonClick}
    listFields={['name', 'description']} 
  />
    
    }


   
    <div className={`card mx-auto`} style={{ maxWidth: '600px' }}>
      <div className={`card-header bg-transparent`}>
        <div className="navbar navbar-expand p-0">
          <ul className="navbar-nav me-auto align-items-center">
            <li className="nav-item">
              <a href="#!" className="nav-link">
                <div
                  className={`position-relative ${styles.profile}`}
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderRadius: '50%',
                  //   border: '2px solid #e84118',
                  //   padding: '2px',
                  // }}
                >
                  <Image
                  src="/images/net.png"
                    alt="Profile Image"
                    width={30}
                    height={30}
                    className="img-fluid rounded-circle"
                  />
                  <span
                    className={`position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle ${styles.newAlert}`}
                  >
                    <span className="visually-hidden">New alerts</span>
                  </span>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="#!" className="nav-link">NetGeni</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* ... */}
          </ul>
        </div>
      </div>
      <div className={`card-body p-4 ${styles.cardBody}`} style={{ height: '500px', overflow: 'auto' }}>
        <div className={`d-flex align-items-baseline mb-4 ${styles.message}`}>
       

          {/* <div className={`position-relative avatar ${styles.profile}`}>
            <Image
                src="/images/ava.png"
              alt="Profile Image"
              width={40}
              height={40}
              className="img-fluid rounded-circle"
            />
            <span
              className={`position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle ${styles.newAlert}`}
            >
              <span className="visually-hidden">New alerts</span>
            </span>
          </div> */}
          <div className="pe-2 mb-4">
          <ChatWindow messages={messages} typingText={typingText} chatWindowRef={chatWindowRef}/>
          </div>
        </div>
        {/* Add more chat messages here */}
      </div>
      <div className={`card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1 ${styles.cardFooter}`}>
        <div className="input-group">
          {/* <div className="input-group-text bg-transparent border-0">
            <button className="btn btn-light text-secondary">
              <i className="fas fa-paperclip"></i>
            </button>
          </div> */}
          <input type="text"  placeholder="Write a message..."  
            name=""
            className="form-control type_msg border-0"
     
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}/>
          <div className="input-group-text bg-transparent border-0">
          <button className="btn btn-light text-secondary" onClick={sendMessage}>
                <i className="fas fa-paper-plane"></i> {/* Replace with plane icon */}
              </button>
          </div>
       
        </div>
      </div>
    </div>
  </div>


  );
}

export default ChatApp;
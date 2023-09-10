
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { FaComment } from 'react-icons/fa';
import { FaCircleNotch } from 'react-icons/fa';
import styles from './chat.module.css'; // Import the CSS module
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component

const channelName = 'scripts'; // Replace with the actual channel nam
const socketUrl = `ws://localhost:8000/ws/netgeni/scripts/?channel=${channelName}`;

const textMessages= `Hello! I'm your network assistance AI, ready to assist you with executing scripts, crafting basic Python code, or helping you discover and run available scripts. 
Whether you need to automate tasks, troubleshoot networking issues, or learn Python, I'm here to support you. Just let me know how I can assist you today!`


const ChatWindow = ({ messages, typingText, chatWindowRef }) => {
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
          {typingText && (
            <div className="message typing-message text-white">{typingText}</div>
          )}
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
    // Establish the WebSocket connection
    const newSocket = establishWebSocketConnection(socketUrl, (message) => {
      // Handle incoming messages and add them to the state
      if (!message || typeof message.message === 'undefined') {
        console.error('Invalid message format:', message);
        return;
      }

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
    console.log(inputText)
   
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
    <div className={`card mx-auto`} style={{ maxWidth: '400px' }}>
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
                  src="/images/ScriptGenius.png"
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
          <div className={`position-relative avatar ${styles.profile}`}>
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
          </div>
          <div className="pe-2">
            {/* ... */}
          </div>
        </div>
        {/* Add more chat messages here */}
      </div>
      <div className={`card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1 ${styles.cardFooter}`}>
        <div className="input-group">
          <div className="input-group-text bg-transparent border-0">
            <button className="btn btn-light text-secondary">
              <i className="fas fa-paperclip"></i>
            </button>
          </div>
          <input type="text" className="form-control border-0" placeholder="Write a message..." />
          <div className="input-group-text bg-transparent border-0">
            <button className="btn btn-light text-secondary">
              <i className="fas fa-smile"></i>
            </button>
          </div>
          <div className="input-group-text bg-transparent border-0">
            <button className="btn btn-light text-secondary">
              <i className="fas fa-microphone"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


//     <div className="container mt-4">
//       <div className={styles["top_menu"]}>
//         <div className={styles["buttons"]}>
//             <div className={styles["button close"]}>
//             {/* <div class="button minimize"></div>
//             <div class="button maximize"></div> */}
//         </div>
//         {/* <div className={styles["title"]}>Chat</div> */}
//         </div>
//         </div>

//     <div className="row justify-content-center h-100">
//       <div className="card contacts_card bg-black">
//     {connecting && (
//       <div className="text-center text-white">
//        <FaCircleNotch className="loading-icon" /> Connecting...
//       </div>
//     )}
//     {!connecting && (
//      <ChatWindow messages={messages} typingText={typingText} chatWindowRef={chatWindowRef}/>
//     )}
// <div className={`card-footer ${styles['fixed-footer']}`}>
//         <div className="input-group">
//           <input
//             type="text"
//             name=""
//             className="form-control type_msg"
//             placeholder="Type your message..."
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//           ></input>
//           <div className="input-group-append">
//           <button className="input-group-text send_btn" onClick={sendMessage}>
//               <i className="fas fa-location-arrow"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//   </div>
//   </div>
//   </div>
  );
}

export default ChatApp;
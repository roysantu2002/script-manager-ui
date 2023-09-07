import { useState, useEffect } from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { FaComment } from 'react-icons/fa';
import { FaCircleNotch } from 'react-icons/fa';

const socketUrl = "ws://192.168.1.103:8000/ws/scriptchat/run_script/";

const textMessages= `Hello! I'm your network assistance AI, ready to assist you with executing scripts, crafting basic Python code, or helping you discover and run available scripts. 
Whether you need to automate tasks, troubleshoot networking issues, or learn Python, I'm here to support you. Just let me know how I can assist you today!`

// const establishWebSocketConnection = (onMessageCallback) => {
//   const socket = new WebSocket(socketUrl);

//   socket.onopen = () => {
//     // WebSocket is open, you can send initial messages here if needed
//   };

//   socket.onmessage = (event) => {
//     const receivedData = event.data;
//     const parsedData = JSON.parse(receivedData);

//     if (parsedData) {
//       onMessageCallback(parsedData);
//     }
//   };

//   socket.onclose = (event) => {
//     // console.log('WebSocket connection closed:', event);
//   };

//   socket.onerror = (error) => {
//     // console.error('WebSocket error:', error);
//   };

//   return socket;
// };

const ChatWindow = ({ messages, typingText }) => (


  <div className="chat-window" style={{ maxHeight: '900px', overflowY: 'auto' }}>


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
);


const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [connecting, setConnecting] = useState(true);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [clearMessages, setClearMessages] = useState(false); // State to control clearing messages

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
    // if (inputText) {
    //   // Send the message logic here (WebSocket or other)
    //   // For demonstration, we'll just update the messages state
    //   setMessages([...messages, { text: inputText, user: 'user' }]);
    //   setInputText('');
    // }
  
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
    <div className="container-fluid bg-dark min-vh-100 d-flex flex-column justify-content-between mb-5">
    {connecting && (
      <div className="text-center text-white">
       <FaCircleNotch className="loading-icon" /> Connecting...
      </div>
    )}
    {!connecting && (
      <ChatWindow messages={messages} typingText={typingText}/>
    )}
    <div className="input-container p-1 m-2 bg-black">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control message-input text-dark"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-success btn-sm"
            onClick={sendMessage}
          >
            <FaComment /> Send
          </button>

          <button
              className="btn btn-danger btn-sm ml-2 m-2"
              onClick={handleClearMessages}
            >
              Clear
            </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ChatApp;
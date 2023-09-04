import React, { useState, useEffect } from "react";

import { useUser } from "../UserContext"
import usersData from "../../../src/data/users.json"
import dynamic from "next/dynamic"; // Import next/dynamic

import LoginPageModal from "./LoginPageModal"; // Adjust the import path

  const LoginPage = () => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useUser();
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const user = usersData.users.find(
        (userData) => userData.username === username
      );
  
      if (user && user.role) {
        login({ username, role: user.role });
        window.location.href = "/";
      }
    };
  
    useEffect(() => {
      setShow(true); // Open the modal on the client side
    }, []);
  
    return (
      <LoginPageModal
        show={show}
        handleClose={handleClose}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        handleSubmit={handleSubmit}
      />
    );
  };
  
  export default LoginPage;
// const LoginPage = () => {
//   const [show, setShow] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useUser();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = usersData.users.find(
//       (userData) => userData.username === username
//     );

//     if (user && user.role) {
//       login({ username, role: user.role });
//       window.location.href = "/";
//     }
//   };

//   // Conditional rendering based on the 'show' state
//   if (show) {
//     return (
//       <LoginPageModal
//         show={show}
//         handleClose={handleClose}
//         username={username}
//         setUsername={setUsername}
//         password={password}
//         setPassword={setPassword}
//         error={error}
//         handleSubmit={handleSubmit}
//       />
//     );
//   } else {
//     // You can render something else when 'show' is false
//     return (
//       <div>
//         <p>Another component or message when the modal is not shown.</p>
//       </div>
//     );
//   }
// };

// const LoginPageModal = ({
//   show,
//   handleClose,
//   username,
//   setUsername,
//   password,
//   setPassword,
//   error,
//   handleSubmit,
// }) => (
//     <div>
//   <Modal show={show} onHide={handleClose}>
//     <Modal.Header closeButton>
//       <Modal.Title>Login</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       {error && <p>{error}</p>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="username">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary mt-3 w-100" type="submit">
//           Login
//         </Button>
//       </Form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleClose}>
//         Close
//       </Button>
//     </Modal.Footer>
//   </Modal>
//   </div>
// );

// export default LoginPage;

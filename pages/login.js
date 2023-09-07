import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUser } from "../src/components/UserContext";
import usersData from "../src/data/users.json";

const LoginPage = () => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser(); // Get the l

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Find the user in the JSON data based on the username
    const user = usersData.users.find(
      (userData) => userData.username === username
    );

    if (user && user.role) {
      // If a matching user is found, set their role directly in the context
      login({ username, role: user.role });

      // Redirect to the dashboard
      window.location.href = "/";
    }
  };

  return (
    <div suppressHydrationWarning={true}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>{error}</p>}
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId='username'>
          <Form.Label>Role</Form.Label>
          <Form.Control
            as='select'
            value={role}
            onChange={(e) => setUsername(e.target.value)}
          >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Form.Control>
        </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary mt-3 w-100' type='submit'>
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
   
  );
};

export default LoginPage;

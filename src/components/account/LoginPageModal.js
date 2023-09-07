import React from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";

const LoginPageModal = ({
  show,
  handleClose,
  username,
  setUsername,
  password,
  setPassword,
  error,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as='select'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <option value=''>Select Role</option>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Form.Control>
        </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* <Button variant="primary mt-3 w-100" type="submit">
            Login
          </Button> */}
          <Modal.Footer>

          <div className="modal-footer"> <button type="submit" className="btn btn-primary">Login</button>
            <button id ="btnHideModal" type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={handleClose}>Close</button></div>
              </Modal.Footer>
        
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default LoginPageModal;

import React from "react";
import { Button } from "react-bootstrap"; // Import Bootstrap components
import { FaStar } from "react-icons/fa"; // Import the icon
import { useUser } from "../UserContext";
import LoginPageModal from "../account/LoginPageModal"
import { useState } from "react";
import usersData from "../../data/users.json"

const NavBar = () => {
  const { user, logout } = useUser(); // Get user and logout function from the context
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for login errors
  const { login } = useUser(); // Get the l

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginLinkClick = () => {
    setShowLoginModal(true);
  };

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
    <nav class='navbar fixed-top navbar-light bg-light'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <FaStar style={{ fontSize: "30px" }} /> {/* Add the icon here */}
          Script Manager
        </a>
        <div className='my-2 my-lg-0'>
          {user ? (
            // If the user is authenticated, show a logout button
            <Button variant='outline-danger' onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
            <a href="#" className="nav-link" onClick={handleLoginLinkClick}>
              Login
            </a>
            {/* Pass relevant props to the LoginPageModal component */}
            <LoginPageModal
              show={showLoginModal}
              handleClose={handleLoginModalClose}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              error={error}
              handleSubmit={handleSubmit}
            />
          </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

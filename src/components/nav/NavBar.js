import React from "react";
import { Button } from "react-bootstrap"; // Import Bootstrap components
import { FaStar } from "react-icons/fa"; // Import the icon
import { useUser } from "../UserContext";
const NavBar = () => {
  const { user, logout } = useUser(); // Get user and logout function from the context

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
            // If the user is not authenticated, show a login link
            <a href='/login' className='nav-link'>
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { FaStar } from "react-icons/fa"; // Import the icon

const NavBar = () => {
  return (
    <nav class='navbar fixed-top navbar-light bg-light'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <FaStar style={{ fontSize: "30px" }} className='text-primary' />{" "}
          {/* Add the icon here */}
          Script Manager
        </a>
        <div className='my-2 my-lg-0'>
          <span>LOGIN</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

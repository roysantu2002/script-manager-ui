import React from "react";
import { Button } from "react-bootstrap"; // Import Bootstrap components
import { FaStar } from "react-icons/fa"; // Import the icon
import { useUser } from "../UserContext";
import LoginPageModal from "../account/LoginPageModal"
import usersData from "../../data/users.json"
import { useRouter } from 'next/router';
// import { FaMagic } from 'react-icons/fa'; 
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Sidebar from "./Sidebar";
import styles from "./Sidebar.module.css";

const NavBar = () => {
  const navRef = useRef();
  const { user, logout } = useUser(); // Get user and logout function from the context
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for login errors
  const { login } = useUser(); // Get the l
  const router = useRouter();
  const [sidebarMenuActive, setSidebarMenuActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);



  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };


  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     setIsMobile(width <= 1000);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!navRef.current?.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [navRef]);

  const toggleSidebar = () => {
    setSidebarMenuActive(!sidebarMenuActive);
  };


  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/")
  };

  const handleLoginLinkClick = () => {
    setShowLoginModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Find the user in the JSON data based on the username
    const user = usersData.users.find((userData) => userData.username === username && userData.password === password);

    if (user && user.role) {
      login({ username, role: user.role });
      window.location.href = "/";
    }else{
      setError("Wrong credentials!")
    }
  };

  return (
    <nav className='navbar fixed-top navbar-light bg-light'>
      <div className='container'>
      <Link href='/' passHref legacyBehavior>

          <Image
            src='/images/ScriptGenius.png'
            alt='ScriptGenius'
            width={160}
            height={50}
          />
        

    </Link>
 
        <div className='my-2 my-lg-0' ref={navRef}>
          {user ? (
                <div
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
                onClick={handleSidebarToggle}
              >
                <Image
                  alt='Profile'
                  src={
                       "/images/ava.png"
                  }
                  className='rounded-circle'
                  width={30}
                  height={30}
                  ref={navRef}
                />
              </div>

            // // If the user is authenticated, show a logout button
            // <Button variant='outline-danger' onClick={handleLogout}>
            //   Logout
            // </Button>
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
        {sidebarOpen  && (
        <Sidebar
          handleSidebarToggle={handleSidebarToggle}
          sidebarMenuActive={sidebarOpen}
        />
      )}
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import NavBar from "../nav/NavBar";
// import Sidebar from "../nav/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {/* <Sidebar/> */}
      <main
        className='container min-vh-100 bg-body'
        style={{ marginTop: "100px" }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;

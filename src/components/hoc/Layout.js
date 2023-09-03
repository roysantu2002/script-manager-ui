import React from "react";
import NavBar from "../nav/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
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

// src/pages/_app.js
import Layout from "@components/hoc/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { UserProvider } from "../src/components/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;

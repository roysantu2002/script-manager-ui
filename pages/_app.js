// src/pages/_app.js
import Layout from "@components/hoc/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

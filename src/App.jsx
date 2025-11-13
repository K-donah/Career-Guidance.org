import React from "react";
import RoutesConfig from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./styles.css"; // <-- Import global CSS

export default function App() {
  return (
    <>
      <RoutesConfig />
      <ToastContainer position="top-right" />
    </>
  );
}

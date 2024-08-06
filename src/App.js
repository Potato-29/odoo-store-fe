import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App({ children }) {
  return (
    <div className="h-full">
      <ToastContainer />
      <Navbar />
      {children}
    </div>
  );
}

export default App;

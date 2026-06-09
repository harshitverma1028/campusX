// frontend/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./App";
import "./styles.css";

// If a token exists in localStorage, set it as default header for axios
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

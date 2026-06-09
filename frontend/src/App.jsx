// frontend/src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import CreateListingPage from "./pages/CreateListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import LoginPage from "./pages/LoginPage";
import "./styles.css";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [refreshKey, setRefreshKey] = useState(0);

  function onLoginSuccess(tokenValue, userObj) {
    setToken(tokenValue);
    setUser(userObj || JSON.parse(localStorage.getItem("user") || "null"));
    localStorage.setItem("token", tokenValue);
    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
    try {
      const axios = require("axios");
      axios.defaults.headers.common["x-auth-token"] = tokenValue;
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;
    } catch (e) {}
    setRefreshKey(k => k + 1);
  }

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setRefreshKey(k => k + 1);
  }

  return (
    <BrowserRouter>
      <div className="app-root">
        <NavBar user={user} onLogout={onLogout} />

        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage token={token} refreshKey={refreshKey} />} />
            <Route path="/create" element={token ? <CreateListingPage token={token} onCreated={() => setRefreshKey(k => k + 1)} /> : <Navigate to="/login" replace />} />
            <Route path="/my" element={token ? <MyListingsPage token={token} /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
            <Route path="*" element={<Navigate to={token ? "/listings" : "/"} replace />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="app-footer-logo">Campus<span>X</span></div>
          <div className="app-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Contact</a>
          </div>
          <div>© {new Date().getFullYear()} CampusX · | Harshit Verma</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

// frontend/src/components/NavBar.jsx

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NavBar({ user, onLogout }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function logout() {
    if (typeof onLogout === "function") onLogout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <Link to="/" className="nav-logo">
        Campus<span>X</span>
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/listings">Listings</NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>

            <li>
              <NavLink to="/my">My Listings</NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="nav-cta">
        {user ? (
          <>
            <span
              style={{
                color: "var(--text)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Hi, {user.name}
            </span>

            <button
              onClick={logout}
              className="btn-outline"
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/listings" className="btn-nav">
              Browse Listings →
            </Link>

            <Link to="/login" className="btn-outline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
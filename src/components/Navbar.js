import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a className="logo" href="/">
        LOGO
      </a>

      <div className="links">
        <a href="/item1">Item1</a>
        <a href="/item2">Item2</a>
        <a href="/item3">Item3</a>
        <a href="/item4">Item4</a>
        <a href="/item5">Item5</a>
        <a href="/item6">Item6</a>
      </div>

      <button className="signin-btn">
        Sign In
      </button>

      {/* <button className="notification-btn">
        <i className="bx bxs-bell"></i>
      </button>

      <button className="user-btn">
        <i className="bx bxs-user-circle"></i>
      </button> */}
    </nav>
  );
}

// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/employeemanagement">Employee Management</Link>
        </li>
        <li>
          <Link to="/taskmanagement">Task Management</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

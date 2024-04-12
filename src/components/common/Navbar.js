// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
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

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";

const EmployeeNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/employee">My Tasks</Link>
        </li>
        <li>
          <Link to="/employee/settings">Settings</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default EmployeeNavbar;

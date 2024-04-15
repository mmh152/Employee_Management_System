// SettingsPage.js
import React from "react";
import Navbar from "../components/common/Navbar";
import EmployeeNavbar from "../components/common/EmployeeNavbar";
import { getUserRole } from "../utils/auth";

const SettingsPage = () => {
  const userRole = getUserRole();

  return (
    <div>
      {userRole === "manager" ? <Navbar /> : <EmployeeNavbar />}
      <h1>Settings</h1>
      {/* TODO: Add settings page content */}
    </div>
  );
};

export default SettingsPage;

import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import EmployeeNavbar from "../components/common/EmployeeNavbar";
import { getUserRole } from "../utils/auth";
import { changePassword } from "../services/api";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const userRole = getUserRole();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    try {
      await changePassword(oldPassword, newPassword);
      if (userRole === "manager") {
        navigate("/employeemanagement");
      } else if (userRole === "employee") {
        navigate("/employee");
      }
    } catch (error) {
      setError("Failed to change password");
    }
  };

  return (
    <div>
      {userRole === "manager" ? <Navbar /> : <EmployeeNavbar />}
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter old password:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Enter new password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Re-enter new password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        {error && <p>{error}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default SettingsPage;

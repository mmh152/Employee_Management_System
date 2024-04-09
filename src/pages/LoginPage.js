import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/common/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    // Check if the username is "maurice". If so, redirect to the EmployeeManagement page.
    if (username.toLowerCase() === "maurice") {
      navigate("/employeemanagement");
    } else {
      // For any other user, redirect to the Employee page (to be implemented later).
      navigate("/employee");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/common/LoginForm";
import * as api from "../services/api";
import { setToken } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const response = await api.login(username, password);
      const { token } = response;
      setToken(token);

      // Decode the token to get the user's role
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const role = decodedToken.role;

      if (role === "manager") {
        navigate("/employeemanagement");
      } else if (role === "employee") {
        navigate("/employee");
      } else {
        setError("Invalid role");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

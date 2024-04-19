import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import LoginForm from "../components/common/LoginForm";
import * as api from "../services/api";
import { setToken } from "../utils/auth";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#fafaf9",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: "#0c0a09",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const response = await api.login(username, password);
      const { token } = response;
      setToken(token);

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
    <StyledContainer>
      <StyledTypography variant="h4">Login Page</StyledTypography>
      <StyledBox>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <LoginForm onLogin={handleLogin} />
      </StyledBox>
    </StyledContainer>
  );
};

export default LoginPage;

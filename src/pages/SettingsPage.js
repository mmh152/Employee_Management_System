import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/common/Navbar";
import EmployeeNavbar from "../components/common/EmployeeNavbar";
import { getUserRole } from "../utils/auth";
import { changePassword } from "../services/api";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  "&:hover": {
    backgroundColor: "#1a9f4a",
  },
}));

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
      <StyledContainer>
        <StyledTypography variant="h4" sx={{ textAlign: "center" }}>
          Settings
        </StyledTypography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            fullWidth
          />
          <StyledTextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
          />
          <StyledTextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          />
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <StyledButton type="submit" variant="contained">
            Change Password
          </StyledButton>
        </StyledForm>
      </StyledContainer>
    </div>
  );
};

export default SettingsPage;

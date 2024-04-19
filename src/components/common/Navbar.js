import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#22c55e",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: "#0c0a09",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#0c0a09",
  marginLeft: theme.spacing(2),
}));

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledTypography variant="h6">Manager's Page</StyledTypography>
        <div>
          <StyledButton component={Link} to="/employeemanagement">
            Employee Management
          </StyledButton>
          <StyledButton component={Link} to="/taskmanagement">
            Task Management
          </StyledButton>
          <StyledButton component={Link} to="/settings">
            Settings
          </StyledButton>
          <StyledButton onClick={handleLogout}>Logout</StyledButton>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;

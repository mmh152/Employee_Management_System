import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import { AppBar, Toolbar, Typography, Button, TextField } from "@mui/material";
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  "& .MuiInputBase-input": {
    color: "#0c0a09",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0c0a09",
    },
    "&:hover fieldset": {
      borderColor: "#0c0a09",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0c0a09",
    },
  },
}));

const Navbar = ({ onSearch, showSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledTypography variant="h6">Manager's Page</StyledTypography>
        <div>
          {showSearch && (
            <StyledTextField
              label="Search Employees"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}
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

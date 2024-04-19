import React, { useState, useContext, useEffect, useCallback } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const StyledForm = styled("form")(({ theme }) => ({
  marginTop: theme.spacing(2),
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
  marginRight: theme.spacing(2),
}));

const EmployeeForm = () => {
  const { addEmployee, updateEmployee, currentEmployee, clearCurrentEmployee } =
    useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
    phone: "",
    role: "",
    profession: "",
  });

  const clearForm = useCallback(() => {
    setEmployee({
      username: "",
      password: "",
      email: "",
      gender: "",
      phone: "",
      role: "",
      profession: "",
    });
    clearCurrentEmployee();
  }, [clearCurrentEmployee]);

  useEffect(() => {
    if (currentEmployee) {
      setEmployee(currentEmployee);
    } else {
      clearForm();
    }
  }, [currentEmployee, clearForm]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
    clearForm();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {currentEmployee ? "Update Employee" : "Add Employee"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="username"
            label="Username"
            value={employee.username}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={employee.password}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="gender"
            label="Gender"
            value={employee.gender}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="phone"
            label="Phone"
            value={employee.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="role"
            label="Role"
            value={employee.role}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="profession"
            label="Profession"
            value={employee.profession}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledButton type="submit" variant="contained">
            {currentEmployee ? "Update" : "Submit"}
          </StyledButton>
          <StyledButton type="button" variant="outlined" onClick={clearForm}>
            Clear
          </StyledButton>
        </Grid>
      </Grid>
    </StyledForm>
  );
};

export default EmployeeForm;

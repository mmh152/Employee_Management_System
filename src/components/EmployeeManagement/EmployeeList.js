import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  fontWeight: "bold",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const EmployeeList = () => {
  const { employees, deleteEmployee, startUpdateProcess } =
    useContext(EmployeeContext);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Employee List
      </Typography>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Profession</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.profession}</TableCell>
                <TableCell>
                  <StyledButton
                    variant="outlined"
                    color="primary"
                    onClick={() => startUpdateProcess(employee)}
                  >
                    Update
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteEmployee(employee.username)}
                  >
                    Delete
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
};

export default EmployeeList;

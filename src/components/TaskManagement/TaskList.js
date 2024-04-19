import React, { useContext, useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { TaskContext } from "../../contexts/TaskContext";
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

const StyledSelect = styled(Select)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const TaskList = () => {
  const { tasks, deleteTask, setCurrentTask, assignTask } =
    useContext(TaskContext);
  const { employees } = useContext(EmployeeContext);
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = (task) => {
    setCurrentTask(task);
  };

  const handleEmployeeSelect = (taskId, employeeId) => {
    setSelectedEmployees((prevState) => ({
      ...prevState,
      [taskId]: employeeId,
    }));
  };

  const handleAssign = async (taskId) => {
    const employeeId = selectedEmployees[taskId];
    if (employeeId) {
      try {
        await assignTask(taskId, employeeId);
        setSuccessMessage(
          "Task successfully assigned and email sent to the employee."
        );
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Failed to assign task:", error);
        // Handle the error, display an error message, or perform any other necessary actions
      }
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      {successMessage && (
        <Typography color="success">{successMessage}</Typography>
      )}
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Progress</StyledTableCell>
              <StyledTableCell>Assigned To</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.date_due}</TableCell>
                <TableCell>{task.progress}%</TableCell>
                <TableCell>
                  {task.assigned_employees
                    ? task.assigned_employees
                        .split(",")
                        .map((employee) => <div key={employee}>{employee}</div>)
                    : "Unassigned"}
                </TableCell>
                <TableCell>
                  <StyledSelect
                    value={selectedEmployees[task.id] || ""}
                    onChange={(e) =>
                      handleEmployeeSelect(task.id, e.target.value)
                    }
                  >
                    <MenuItem value="">Select Employee</MenuItem>
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.username}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  <StyledButton
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAssign(task.id)}
                  >
                    Assign
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdate(task)}
                  >
                    Update
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteTask(task.id)}
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

export default TaskList;

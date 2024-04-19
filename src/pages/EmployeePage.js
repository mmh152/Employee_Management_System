import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeTaskContext } from "../contexts/EmployeeTaskContext";
import { BroadcastMessageContext } from "../contexts/BroadcastMessageContext";
import EmployeeNavbar from "../components/common/EmployeeNavbar";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  fontWeight: "bold",
}));

const EmployeePage = () => {
  const { tasks, loading, error, fetchTasks, updateProgress } =
    useContext(EmployeeTaskContext);
  const { messages, fetchBroadcastMessages } = useContext(
    BroadcastMessageContext
  );
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchBroadcastMessages();
  }, [fetchTasks, fetchBroadcastMessages]);

  const handleProgressUpdate = (taskId, progress) => {
    updateProgress(taskId, progress);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div>
      <EmployeeNavbar />
      <StyledContainer>
        <Typography variant="h4" gutterBottom>
          Employee Tasks
        </Typography>
        {tasks.length === 0 ? (
          <Typography>No tasks assigned to you.</Typography>
        ) : (
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Task Name</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Progress</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
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
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) =>
                          handleProgressUpdate(
                            task.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          View Broadcast Messages
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Broadcast Messages</DialogTitle>
          <DialogContent>
            {messages.length === 0 ? (
              <Typography>No broadcast messages available.</Typography>
            ) : (
              messages.map((message, index) => (
                <div key={index}>
                  <Typography>{message.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {message.timestamp}
                  </Typography>
                  <hr />
                </div>
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </StyledContainer>
    </div>
  );
};

export default EmployeePage;

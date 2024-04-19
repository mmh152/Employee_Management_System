import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { EmployeeTaskContext } from "../contexts/EmployeeTaskContext";
import { BroadcastMessageContext } from "../contexts/BroadcastMessageContext";
import EmployeeNavbar from "../components/common/EmployeeNavbar";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <EmployeeNavbar />
      <h1>Employee Tasks</h1>
      {tasks.length === 0 ? (
        <div>No tasks assigned to you.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.date_due}</td>
                <td>{task.progress}%</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) =>
                      handleProgressUpdate(task.id, parseInt(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add the button to open the broadcast messages dialog */}
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        View Broadcast Messages
      </Button>

      {/* Add the broadcast messages dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Broadcast Messages</DialogTitle>
        <DialogContent>
          {messages.length === 0 ? (
            <Typography>No broadcast messages available.</Typography>
          ) : (
            messages.map((message, index) => (
              <div key={index}>
                {/* <Typography variant="subtitle1">{message.sender}</Typography> */}
                <Typography>{message.content}</Typography>
                <Typography variant="caption">{message.timestamp}</Typography>
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
    </div>
  );
};

export default EmployeePage;

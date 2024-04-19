import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { BroadcastMessageContext } from "../contexts/BroadcastMessageContext";
import Navbar from "../components/common/Navbar";
import EmployeeList from "../components/EmployeeManagement/EmployeeList";
import EmployeeForm from "../components/EmployeeManagement/EmployeeForm";
import AddEmployeeButton from "../components/EmployeeManagement/AddEmployeeButton";

const EmployeeManagementPage = () => {
  const { isAddingEmployee, currentEmployee } = useContext(EmployeeContext);
  const { sendBroadcastMessage } = useContext(BroadcastMessageContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // This is where you might perform any additional setup when the component mounts.
    // For example, fetching employees if your context doesn't already do it on initialization.
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMessage("");
  };

  const handleSendMessage = () => {
    sendBroadcastMessage(message);
    handleCloseDialog();
  };

  return (
    <div>
      <Navbar />
      <h1>Employee Management</h1>
      <AddEmployeeButton />
      {(isAddingEmployee || currentEmployee) && <EmployeeForm />}
      <EmployeeList />

      {/* Add the broadcast message button */}
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Send Broadcast Message
      </Button>

      {/* Add the broadcast message dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Send Broadcast Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeManagementPage;

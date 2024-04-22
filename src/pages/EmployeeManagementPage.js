import React, { useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { BroadcastMessageContext } from "../contexts/BroadcastMessageContext";
import Navbar from "../components/common/Navbar";
import EmployeeList from "../components/EmployeeManagement/EmployeeList";
import EmployeeForm from "../components/EmployeeManagement/EmployeeForm";
import AddEmployeeButton from "../components/EmployeeManagement/AddEmployeeButton";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  "&:hover": {
    backgroundColor: "#1a9f4a",
  },
}));

const EmployeeManagementPage = () => {
  const { isAddingEmployee, currentEmployee, employees, searchEmployees } =
    useContext(EmployeeContext);
  const { sendBroadcastMessage } = useContext(BroadcastMessageContext);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    searchEmployees(searchQuery);
  }, [searchQuery, searchEmployees]);

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} showSearch={true} />
      <StyledContainer>
        <StyledTypography variant="h4">Employee Management</StyledTypography>
        <Divider sx={{ bgcolor: "black", height: "2px", mt: 3, mb: 4 }} />
        <AddEmployeeButton />
        {(isAddingEmployee || currentEmployee) && <EmployeeForm />}
        <Divider sx={{ bgcolor: "black", height: "2px", mt: 5, mb: 3 }} />
        <EmployeeList employees={employees} />

        <Divider sx={{ bgcolor: "black", height: "2px", mt: 5, mb: 2 }} />
        <StyledButton
          variant="contained"
          onClick={handleOpenDialog}
          sx={{ mb: 5 }}
        >
          Send Broadcast Message
        </StyledButton>

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
      </StyledContainer>
    </div>
  );
};

export default EmployeeManagementPage;

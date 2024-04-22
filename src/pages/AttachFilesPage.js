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
} from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeTaskContext } from "../contexts/EmployeeTaskContext";
import EmployeeNavbar from "../components/common/EmployeeNavbar";
import AttachFileForm from "../components/AttachFiles/AttachFileForm";
import AttachedFilesList from "../components/AttachFiles/AttachedFilesList";
import {
  fetchAttachedFiles,
  attachFile,
  deleteAttachedFile,
} from "../services/api";

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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  "&:hover": {
    backgroundColor: "#1a9f4a",
  },
}));

const AttachFilesPage = () => {
  const { tasks, fetchTasks, attachedFiles, fetchAttachedFiles } =
    useContext(EmployeeTaskContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [attachFileOpen, setAttachFileOpen] = useState(false);
  const [viewAttachedFilesOpen, setViewAttachedFilesOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAttachFile = (task) => {
    setSelectedTask(task);
    setAttachFileOpen(true);
  };

  const handleViewAttachedFiles = (task) => {
    setSelectedTask(task);
    fetchAttachedFiles(task.id); // Fetch the attached files for the selected task
    setViewAttachedFilesOpen(true);
  };

  const handleAttachFileClose = () => {
    setSelectedTask(null);
    setAttachFileOpen(false);
  };

  const handleViewAttachedFilesClose = () => {
    setSelectedTask(null);
    setViewAttachedFilesOpen(false);
  };

  //   if (loading) {
  //     return <Typography>Loading...</Typography>;
  //   }

  //   if (error) {
  //     return <Typography color="error">Error: {error}</Typography>;
  //   }

  return (
    <div>
      <EmployeeNavbar />
      <StyledContainer>
        <Typography variant="h4" gutterBottom>
          Attach Files
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
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.date_due}</TableCell>
                    <TableCell>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleAttachFile(task)}
                      >
                        Attach File
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewAttachedFiles(task)}
                      >
                        View Attached Files
                      </StyledButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </StyledContainer>

      <AttachFileForm
        open={attachFileOpen}
        task={selectedTask}
        onClose={handleAttachFileClose}
        attachFile={attachFile}
      />

      <AttachedFilesList
        open={viewAttachedFilesOpen}
        task={selectedTask}
        attachedFiles={attachedFiles[selectedTask?.id] || []}
        onClose={handleViewAttachedFilesClose}
        deleteAttachedFile={deleteAttachedFile}
        fetchAttachedFiles={fetchAttachedFiles}
      />
    </div>
  );
};

export default AttachFilesPage;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  GetApp as DownloadIcon,
} from "@mui/icons-material";
import { API_BASE_URL } from "../../services/api";

const AttachedFilesList = ({
  open,
  task,
  onClose,
  attachedFiles,
  deleteAttachedFile,
}) => {
  const handleDownload = (file) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `${API_BASE_URL}/uploads/${file.file_path}`;
    downloadLink.download = file.file_path;
    downloadLink.click();
  };

  const handleDelete = (file) => {
    deleteAttachedFile(task.id, file.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Attached Files</DialogTitle>
      <DialogContent>
        {attachedFiles.length === 0 ? (
          <p>No files attached to this task.</p>
        ) : (
          <List>
            {attachedFiles.map((file) => (
              <ListItem key={file.id}>
                <ListItemText primary={file.file_path} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="download"
                    onClick={() => handleDownload(file)}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttachedFilesList;

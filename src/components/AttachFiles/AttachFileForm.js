import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledInput = styled("input")({
  display: "none",
});

const AttachFileForm = ({ open, task, onClose, attachFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        await attachFile(task.id, selectedFile);
        setSelectedFile(null);
        onClose();
      } catch (error) {
        console.error("Failed to attach file", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Attach File to Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          value={task ? task.name : ""}
          fullWidth
          disabled
          margin="normal"
        />
        <label htmlFor="attach-file">
          <StyledInput
            id="attach-file"
            type="file"
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
        {selectedFile && (
          <TextField
            label="Selected File"
            value={selectedFile.name}
            fullWidth
            disabled
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!selectedFile}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttachFileForm;

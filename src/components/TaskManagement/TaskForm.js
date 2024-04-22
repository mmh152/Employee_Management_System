import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { TaskContext } from "../../contexts/TaskContext";

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
}));

const TaskForm = () => {
  const { addTask, currentTask, updateTask, clearCurrentTask } =
    useContext(TaskContext);

  const [task, setTask] = useState({
    name: "",
    description: "",
    date_due: "",
    progress: 0,
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({
        name: "",
        description: "",
        date_due: "",
        progress: 0,
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTask = {
      ...task,
      date_due: task.date_due.split("T")[0], // Extract only the date portion
      progress: parseInt(task.progress), // Convert progress to an integer
    };
    if (currentTask) {
      updateTask(formattedTask);
    } else {
      addTask(formattedTask);
    }
    clearCurrentTask();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {currentTask ? "Update Task" : "Add Task"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="name"
            label="Task Name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="description"
            label="Task Description"
            multiline
            rows={4}
            value={task.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="date_due"
            label="Due Date"
            type="date"
            value={task.date_due}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            name="progress"
            label="Progress"
            type="number"
            value={task.progress}
            onChange={handleChange}
            required
            inputProps={{
              min: 0,
              max: 100,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledButton type="submit" variant="contained">
            {currentTask ? "Update Task" : "Add Task"}
          </StyledButton>
        </Grid>
      </Grid>
    </StyledForm>
  );
};

export default TaskForm;

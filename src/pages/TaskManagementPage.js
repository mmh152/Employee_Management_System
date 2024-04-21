import React, { useContext, useEffect } from "react";
import { Container, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";
import TaskList from "../components/TaskManagement/TaskList";
import TaskForm from "../components/TaskManagement/TaskForm";
import AddTaskButton from "../components/TaskManagement/AddTaskButton";
import { TaskContext } from "../contexts/TaskContext";
import Navbar from "../components/common/Navbar";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const TaskManagementPage = () => {
  const { isAddingTask, currentTask, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <Navbar />
      <StyledContainer>
        <StyledTypography variant="h4">Task Management</StyledTypography>
        <Divider sx={{ bgcolor: "black", height: "2px", mt: 3, mb: 4 }} />
        <AddTaskButton />

        {(isAddingTask || currentTask) && <TaskForm />}
        <Divider sx={{ bgcolor: "black", height: "2px", mt: 5, mb: 4 }} />
        <TaskList />
      </StyledContainer>
    </div>
  );
};

export default TaskManagementPage;

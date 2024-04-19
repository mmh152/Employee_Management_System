import React, { useContext } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { TaskContext } from "../../contexts/TaskContext";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  "&:hover": {
    backgroundColor: "#1a9f4a",
  },
}));

const AddTaskButton = () => {
  const { setIsAddingTask } = useContext(TaskContext);

  const handleClick = () => {
    setIsAddingTask(true);
  };

  return (
    <StyledButton variant="contained" onClick={handleClick}>
      Add Task
    </StyledButton>
  );
};

export default AddTaskButton;

import React, { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const AddTaskButton = () => {
  const { setIsAddingTask } = useContext(TaskContext);

  const handleClick = () => {
    setIsAddingTask(true);
  };

  return <button onClick={handleClick}>Add Task</button>;
};

export default AddTaskButton;

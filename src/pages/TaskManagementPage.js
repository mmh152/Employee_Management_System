// TaskManagementPage.js
import React, { useContext, useEffect } from "react";
import TaskList from "../components/TaskManagement/TaskList";
import TaskForm from "../components/TaskManagement/TaskForm";
import AddTaskButton from "../components/TaskManagement/AddTaskButton";
import { TaskContext } from "../contexts/TaskContext";
import Navbar from "../components/common/Navbar";

const TaskManagementPage = () => {
  const { isAddingTask, currentTask, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <Navbar />
      <h1>Task Management</h1>
      <AddTaskButton />
      {(isAddingTask || currentTask) && <TaskForm />}
      <TaskList />
    </div>
  );
};

export default TaskManagementPage;

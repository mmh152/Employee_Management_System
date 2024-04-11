import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";

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
    };
    if (currentTask) {
      updateTask(formattedTask);
    } else {
      addTask(formattedTask);
    }
    clearCurrentTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleChange}
        placeholder="Task Name"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      ></textarea>
      <input
        type="date"
        name="date_due"
        value={task.date_due}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="progress"
        value={task.progress}
        onChange={handleChange}
        min="0"
        max="100"
        required
      />
      <button type="submit">{currentTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;

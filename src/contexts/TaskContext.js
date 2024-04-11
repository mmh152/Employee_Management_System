import React, { createContext, useState, useCallback } from "react";
import * as api from "../services/api";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  }, []);

  const addTask = useCallback(
    async (task) => {
      try {
        await api.addTask(task);
        fetchTasks();
        setIsAddingTask(false);
      } catch (error) {
        console.error("Failed to add task", error);
      }
    },
    [fetchTasks]
  );

  const updateTask = useCallback(
    async (task) => {
      try {
        await api.updateTask(task);
        fetchTasks();
        setCurrentTask(null);
      } catch (error) {
        console.error("Failed to update task", error);
      }
    },
    [fetchTasks]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      try {
        await api.deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    },
    [fetchTasks]
  );

  // const assignTask = useCallback(
  //   async (taskId, employeeId) => {
  //     try {
  //       await api.assignTask(taskId, employeeId);
  //       fetchTasks();
  //     } catch (error) {
  //       console.error("Failed to assign task", error);
  //     }
  //   },
  //   [fetchTasks]
  // );

  // const assignTask = useCallback(
  //   async (taskId, username) => {
  //     try {
  //       await api.assignTask(taskId, username);
  //       fetchTasks();
  //     } catch (error) {
  //       console.error("Failed to assign task", error);
  //     }
  //   },
  //   [fetchTasks]
  // );

  const assignTask = useCallback(
    async (taskId, employeeId) => {
      try {
        await api.assignTask(taskId, employeeId);
        fetchTasks();
      } catch (error) {
        console.error("Failed to assign task", error);
      }
    },
    [fetchTasks]
  );

  const clearCurrentTask = () => {
    setCurrentTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isAddingTask,
        setIsAddingTask,
        currentTask,
        setCurrentTask,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        assignTask,
        clearCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

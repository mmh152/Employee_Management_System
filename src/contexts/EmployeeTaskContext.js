import React, { createContext, useState, useCallback } from "react";
import { getEmployeeTasks, updateTaskProgress } from "../services/api";

export const EmployeeTaskContext = createContext();

const EmployeeTaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployeeTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch employee tasks");
      setLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (taskId, progress) => {
    try {
      await updateTaskProgress(taskId, progress);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, progress } : task
        )
      );
    } catch (error) {
      setError("Failed to update task progress");
    }
  }, []);

  return (
    <EmployeeTaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        updateProgress,
      }}
    >
      {children}
    </EmployeeTaskContext.Provider>
  );
};

export default EmployeeTaskProvider;

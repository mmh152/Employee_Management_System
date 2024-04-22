import React, { createContext, useState, useCallback } from "react";
import {
  getEmployeeTasks,
  updateTaskProgress,
  getAttachedFiles,
  attachFile,
  deleteAttachedFile,
} from "../services/api";

export const EmployeeTaskContext = createContext();

const EmployeeTaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState({});
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

  const fetchAttachedFiles = useCallback(
    async (taskId) => {
      try {
        const files = await getAttachedFiles(taskId);
        setAttachedFiles((prevFiles) => ({
          ...prevFiles,
          [taskId]: files,
        }));
        console.log("Updated Attached Files:", attachedFiles);
      } catch (error) {
        console.error("Failed to fetch attached files", error);
      }
    },
    [attachedFiles]
  );

  const attachFile = useCallback(
    async (taskId, file) => {
      try {
        await attachFile(taskId, file);
        fetchAttachedFiles(taskId);
      } catch (error) {
        console.error("Failed to attach file", error);
      }
    },
    [fetchAttachedFiles]
  );

  const deleteAttachedFile = useCallback(async (taskId, fileId) => {
    try {
      await deleteAttachedFile(taskId, fileId);
      setAttachedFiles((prevFiles) => ({
        ...prevFiles,
        [taskId]: prevFiles[taskId].filter((file) => file.id !== fileId),
      }));
    } catch (error) {
      console.error("Failed to delete attached file", error);
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
        attachedFiles,
        fetchAttachedFiles,
        attachFile,
        deleteAttachedFile,
      }}
    >
      {children}
    </EmployeeTaskContext.Provider>
  );
};

export default EmployeeTaskProvider;

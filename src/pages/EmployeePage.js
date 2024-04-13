import React, { useContext, useEffect } from "react";
import { EmployeeTaskContext } from "../contexts/EmployeeTaskContext";
import EmployeeNavbar from "../components/common/Navbar";

const EmployeePage = () => {
  const { tasks, loading, error, fetchTasks, updateProgress } =
    useContext(EmployeeTaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleProgressUpdate = (taskId, progress) => {
    updateProgress(taskId, progress);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <EmployeeNavbar />
      <h1>Employee Tasks</h1>
      {tasks.length === 0 ? (
        <div>No tasks assigned to you.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.date_due}</td>
                <td>{task.progress}%</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) =>
                      handleProgressUpdate(task.id, parseInt(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeePage;

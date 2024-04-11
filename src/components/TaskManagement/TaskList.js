import React, { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const TaskList = () => {
  const { tasks, deleteTask, setCurrentTask, assignTask } =
    useContext(TaskContext);

  const handleUpdate = (task) => {
    setCurrentTask(task);
  };

  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Progress</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.date_due.split(" ")[0]}</td>
              <td>{task.progress}%</td>
              <td>{task.employee_id ? task.employee_id : "Unassigned"}</td>
              <td>
                <button onClick={() => assignTask(task.id)}>Assign</button>
                <button onClick={() => handleUpdate(task)}>Update</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

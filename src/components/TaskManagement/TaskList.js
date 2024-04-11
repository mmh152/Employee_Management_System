import React, { useContext, useState } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const TaskList = () => {
  const { tasks, deleteTask, setCurrentTask, assignTask } =
    useContext(TaskContext);
  const { employees } = useContext(EmployeeContext);
  const [selectedEmployees, setSelectedEmployees] = useState({});

  const handleUpdate = (task) => {
    setCurrentTask(task);
  };

  const handleEmployeeSelect = (taskId, employeeId) => {
    setSelectedEmployees((prevState) => ({
      ...prevState,
      [taskId]: employeeId,
    }));
  };

  const handleAssign = (taskId) => {
    const employeeId = selectedEmployees[taskId];
    if (employeeId) {
      assignTask(taskId, employeeId);
    }
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
              <td>{task.date_due}</td>
              <td>{task.progress}%</td>
              <td>
                {task.assigned_employees
                  ? task.assigned_employees
                      .split(",")
                      .map((employee) => <div key={employee}>{employee}</div>)
                  : "Unassigned"}
              </td>
              <td>
                <select
                  value={selectedEmployees[task.id] || ""}
                  onChange={(e) =>
                    handleEmployeeSelect(task.id, e.target.value)
                  }
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.username}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleAssign(task.id)}>Assign</button>
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

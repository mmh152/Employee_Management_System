import React, { useContext } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const EmployeeList = () => {
  const { employees, deleteEmployee, startUpdateProcess } =
    useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.phone}</td>
              <td>{employee.role}</td>
              <td>{employee.profession}</td>
              <td>
                <button onClick={() => startUpdateProcess(employee)}>
                  Update
                </button>
                <button onClick={() => deleteEmployee(employee.username)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

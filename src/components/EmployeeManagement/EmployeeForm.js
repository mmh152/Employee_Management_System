import React, { useState, useContext, useEffect } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const EmployeeForm = () => {
  const { addEmployee, updateEmployee, currentEmployee, clearCurrentEmployee } =
    useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
    phone: "",
    role: "",
    profession: "",
  });

  // If currentEmployee is not null, populate the form fields for update
  useEffect(() => {
    if (currentEmployee) {
      setEmployee(currentEmployee);
    } else {
      clearForm();
    }
  }, [currentEmployee]);

  const clearForm = () => {
    setEmployee({
      username: "",
      password: "",
      email: "",
      gender: "",
      phone: "",
      role: "",
      profession: "",
    });
    clearCurrentEmployee();
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={employee.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />

      <input
        type="password"
        name="password"
        value={employee.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="gender"
        value={employee.gender}
        onChange={handleChange}
        placeholder="Gender"
      />
      <input
        type="text"
        name="phone"
        value={employee.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="role"
        value={employee.role}
        onChange={handleChange}
        placeholder="Role"
      />
      <input
        type="text"
        name="profession"
        value={employee.profession}
        onChange={handleChange}
        placeholder="Profession"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={clearForm}>
        Clear
      </button>
    </form>
  );
};

export default EmployeeForm;

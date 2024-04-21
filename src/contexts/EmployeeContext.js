import React, { createContext, useState, useEffect } from "react";
import * as api from "../services/api";

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isAddingEmployee, setAddingEmployee] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      await api.addEmployee(employeeData);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to add employee", error);
    }
  };

  const updateEmployee = async (employee) => {
    try {
      await api.updateEmployee(employee.username, employee);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  const deleteEmployee = async (username) => {
    try {
      await api.deleteEmployee(username);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  const clearCurrentEmployee = () => {
    setCurrentEmployee(null);
  };

  const startUpdateProcess = (employee) => {
    setCurrentEmployee(employee);
    setAddingEmployee(false);
  };

  const searchEmployees = (query) => {
    const filteredResults = employees.filter((employee) =>
      employee.username.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        currentEmployee,
        setCurrentEmployee,
        clearCurrentEmployee,
        startUpdateProcess,
        isAddingEmployee,
        setAddingEmployee,
        searchResults,
        searchEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;

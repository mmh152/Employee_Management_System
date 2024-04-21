import React, { createContext, useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isAddingEmployee, setAddingEmployee] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  }, []);

  const addEmployee = useCallback(
    async (employeeData) => {
      try {
        await api.addEmployee(employeeData);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to add employee", error);
      }
    },
    [fetchEmployees]
  );

  const updateEmployee = useCallback(
    async (employee) => {
      try {
        await api.updateEmployee(employee.username, employee);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to update employee", error);
      }
    },
    [fetchEmployees]
  );

  const deleteEmployee = useCallback(
    async (username) => {
      try {
        await api.deleteEmployee(username);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to delete employee", error);
      }
    },
    [fetchEmployees]
  );

  const clearCurrentEmployee = () => {
    setCurrentEmployee(null);
  };

  const startUpdateProcess = (employee) => {
    setCurrentEmployee(employee);
    setAddingEmployee(false);
  };

  const searchEmployees = useCallback((query) => {
    const fetchSearchResults = async () => {
      try {
        const data = await api.searchEmployees(query);
        setEmployees(data);
      } catch (error) {
        console.error("Failed to search employees", error);
      }
    };

    fetchSearchResults();
  }, []);

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
        searchEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;

// EmployeeManagementPage.js
import React, { useContext, useEffect } from "react";
import EmployeeList from "../components/EmployeeManagement/EmployeeList";
import EmployeeForm from "../components/EmployeeManagement/EmployeeForm";
import AddEmployeeButton from "../components/EmployeeManagement/AddEmployeeButton";
import { EmployeeContext } from "../contexts/EmployeeContext";
import Navbar from "../components/common/Navbar";

const EmployeeManagementPage = () => {
  const { isAddingEmployee, currentEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    // This is where you might perform any additional setup when the component mounts.
    // For example, fetching employees if your context doesn't already do it on initialization.
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Employee Management</h1>
      <AddEmployeeButton />
      {(isAddingEmployee || currentEmployee) && <EmployeeForm />}
      <EmployeeList />
    </div>
  );
};

export default EmployeeManagementPage;

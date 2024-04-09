import React, { useContext } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const AddEmployeeButton = () => {
  const { setAddingEmployee } = useContext(EmployeeContext);

  return <button onClick={() => setAddingEmployee(true)}>Add Employee</button>;
};

export default AddEmployeeButton;

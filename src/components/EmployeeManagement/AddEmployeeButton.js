import React, { useContext } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#22c55e",
  color: "#0c0a09",
  "&:hover": {
    backgroundColor: "#1a9f4a",
  },
}));

const AddEmployeeButton = () => {
  const { setAddingEmployee } = useContext(EmployeeContext);

  const handleClick = () => {
    setAddingEmployee(true);
  };

  return (
    <StyledButton variant="contained" onClick={handleClick}>
      Add Employee
    </StyledButton>
  );
};

export default AddEmployeeButton;

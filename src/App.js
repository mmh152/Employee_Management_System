import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import EmployeePage from "./pages/EmployeePage"; // Placeholder for now
import "./App.css";
import EmployeeProvider from "./contexts/EmployeeContext";

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/employeemanagement"
            element={<EmployeeManagementPage />}
          />
          <Route path="/employee" element={<EmployeePage />} />{" "}
          {/* Placeholder for now */}
          {/* Redirect to login page if any other path is hit */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  );
};

export default App;

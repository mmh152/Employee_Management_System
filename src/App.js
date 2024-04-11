// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import TaskManagementPage from "./pages/TaskManagementPage";
import SettingsPage from "./pages/SettingsPage";
import EmployeePage from "./pages/EmployeePage"; // Placeholder for now
import "./App.css";
import EmployeeProvider from "./contexts/EmployeeContext";
import TaskProvider from "./contexts/TaskContext";

const App = () => {
  return (
    <EmployeeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/employeemanagement"
              element={<EmployeeManagementPage />}
            />
            <Route path="/taskmanagement" element={<TaskManagementPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/employee" element={<EmployeePage />} />{" "}
            {/* Placeholder for now */}
            {/* Redirect to login page if any other path is hit */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Router>
      </TaskProvider>
    </EmployeeProvider>
  );
};

export default App;

// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import TaskManagementPage from "./pages/TaskManagementPage";
import SettingsPage from "./pages/SettingsPage";
import EmployeePage from "./pages/EmployeePage";
import "./App.css";
import EmployeeProvider from "./contexts/EmployeeContext";
import TaskProvider from "./contexts/TaskContext";
import { isAuthenticated, getUserRole } from "./utils/auth";

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  return isAuth && roles.includes(userRole) ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

const App = () => {
  return (
    <EmployeeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/employeemanagement"
              element={
                <PrivateRoute
                  element={EmployeeManagementPage}
                  roles={["manager"]}
                />
              }
            />
            <Route
              path="/taskmanagement"
              element={
                <PrivateRoute
                  element={TaskManagementPage}
                  roles={["manager"]}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  element={SettingsPage}
                  roles={["manager", "employee"]}
                />
              }
            />
            <Route
              path="/employee"
              element={
                <PrivateRoute element={EmployeePage} roles={["employee"]} />
              }
            />
            {/* Redirect to login page if any other path is hit */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TaskProvider>
    </EmployeeProvider>
  );
};

export default App;

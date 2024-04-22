import { getToken } from "../utils/auth";

export const API_BASE_URL = "http://127.0.0.1:5000";

export const getEmployees = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/view_employees`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/add_employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const updateEmployee = async (username, employeeData) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${API_BASE_URL}/update_employee/${username}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const deleteEmployee = async (username) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/delete_employee`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

// ... existing code ...

export const getTasks = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/view_tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/add_task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const updateTask = async (taskData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/update_task`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/delete_task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: taskId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

// export const assignTask = async (taskId, employeeId) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${API_BASE_URL}/assign_task`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ task_id: taskId, employee_id: employeeId }),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//     throw error;
//   }
// };

export const assignTask = async (taskId, employeeId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/assign_task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task_id: taskId, employee_id: employeeId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the assign task operation:", error);
    throw error;
  }
};

export const getEmployeeTasks = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/employee_tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const updateTaskProgress = async (taskId, progress) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/update_task_progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task_id: taskId, progress }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the login operation:", error);
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/change_password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const sendBroadcastMessage = async (message) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/send_broadcast_message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sender: "Manager", content: message }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const getBroadcastMessages = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/get_broadcast_messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const searchEmployees = async (query) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${API_BASE_URL}/search_employees?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const attachFile = async (taskId, file) => {
  try {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);

    console.log("Selected file:", file);
    console.log("Form data:", formData);

    try {
      const response = await fetch(`${API_BASE_URL}/attach_file/${taskId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  } catch (error) {
    console.error("There was a problem with the attach file operation:", error);
    throw error;
  }
};

export const getAttachedFiles = async (taskId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/attached_files/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const deleteAttachedFile = async (taskId, fileId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${API_BASE_URL}/delete_file/${taskId}/${fileId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

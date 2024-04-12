// auth.js

// Function to store the token in local storage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to retrieve the token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    // Decode the token to get the expiration time
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedToken.exp > currentTime) {
      return true;
    }
  }
  return false;
};

// Function to get the user's role from the token
export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.role;
  }
  return null;
};

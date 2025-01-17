# Employee Management System

A full-stack Employee Management System built using **React** for the frontend and **Flask** for the backend. This system enables efficient management of employee data with secure authentication, dynamic user interfaces, and robust backend APIs.

---

## Features

- **Frontend**:
  - Dynamic and interactive user interface built with React.
  - Input validation to ensure data accuracy and prevent injection attacks.
  - Modular and reusable components for scalability.

- **Backend**:
  - RESTful APIs implemented using Flask for efficient data management.
  - Secure password hashing and user authentication with JWT.
  - File upload functionality with validation of allowed file types.

- **General**:
  - Clean and organized project structure for ease of navigation and collaboration.
  - Cross-Origin Resource Sharing (CORS) enabled for seamless frontend-backend communication.

---

## Project Structure

```
430_project-main
│
├── app.py                  # Main backend application file
├── requirements.txt        # Python dependencies
│
├── public/                 # Static files (e.g., index.html)
│
├── src/                    # React frontend source code
│   ├── components/         # Reusable UI components
│   ├── contexts/           # Context providers for global state management
│   ├── pages/              # Pages of the application
│   ├── services/           # API services for backend interaction
│   ├── utils/              # Utility functions
│   ├── App.js              # Main React application file
│   ├── index.js            # Entry point for the React app
│   ├── App.css             # Global CSS
│   ├── index.css           # Global styles
│
├── uploads/                # Uploaded files directory
│
├── .gitignore              # Ignored files for version control
├── README.md               # Project documentation (you are here!)
├── package.json            # NPM dependencies
├── package-lock.json       # Dependency lock file
│
└── setupTests.js           # Unit test setup for React
```

---

## Installation

### Backend
1. Navigate to the backend directory.
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   flask run
   ```

### Frontend
1. Navigate to the `src/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## Usage

1. Start the backend Flask server.
2. Start the React frontend development server.
3. Access the application at `http://localhost:3000`.



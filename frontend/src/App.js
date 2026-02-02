import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [backendHealth, setBackendHealth] = useState("Checking...");
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!API_BASE) {
      setBackendHealth("API base URL NOT configured");
      return;
    }

    fetch(`${API_BASE}/health`)
      .then((res) => res.text())
      .then((data) => setBackendHealth(data))
      .catch(() => setBackendHealth("Backend not reachable"));
  }, [API_BASE]);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>📚 Book Finder</h1>

      <p>
        <strong>Backend health:</strong>{" "}
        {backendHealth === "OK" ? "✅ OK" : backendHealth}
      </p>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

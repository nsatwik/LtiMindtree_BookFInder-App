import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState("Checking...");
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Hard guard: never allow silent fallback
    if (!API_BASE) {
      setError("API base URL is NOT configured");
      return;
    }

    fetch(`${API_BASE}/health`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.text();
      })
      .then((data) => setHealth(data))
      .catch(() => setError("Backend not reachable"));
  }, [API_BASE]);

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>📚 Book Finder</h1>

      <p>
        <strong>Backend health:</strong>{" "}
        {error ? <span style={{ color: "red" }}>{error}</span> : health}
      </p>

      {!API_BASE && (
        <p style={{ color: "orange" }}>
          ⚠️ REACT_APP_API_BASE_URL is missing. Check your .env file.
        </p>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export default function Dashboard() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("Unauthorized");
      return;
    }

    fetch(`${API_BASE}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.text();
      })
      .then((data) => setStatus(data))
      .catch(() => setStatus("Unauthorized"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{status}</p>
    </div>
  );
}

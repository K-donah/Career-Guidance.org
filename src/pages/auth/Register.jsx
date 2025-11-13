import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) return setError("All fields are required");

    const res = await register({ name, email, password, role });
    if (!res.success) {
      setError(res.message || "Registration failed");
      return;
    }

    if (role === "admin") nav("/admin");
    else if (role === "institute") nav("/institute");
    else if (role === "student") nav("/student");
    else if (role === "company") nav("/company");
    else nav("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #4f46e5, #3b82f6)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#111827" }}>
          Register
        </h2>

        {error && (
          <div
            style={{
              color: "#ef4444",
              background: "#fee2e2",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "600", color: "#374151" }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              transition: "0.2s",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "600", color: "#374151" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "600", color: "#374151" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "600", color: "#374151" }}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="student">Student</option>
            <option value="institute">Institute</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#4338ca")}
          onMouseOut={(e) => (e.target.style.background = "#4f46e5")}
        >
          Register
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4f46e5", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

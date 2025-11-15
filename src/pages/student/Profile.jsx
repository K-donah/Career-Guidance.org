// src/pages/student/Profile.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || ""); // optional display
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return alert("Name cannot be empty");
    setSaving(true);
    updateUser({ ...user, name: name.trim() });
    setSaving(false);
    alert("Profile updated successfully!");
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Update Profile</h2>

        <div
          style={{
            maxWidth: 500,
            backgroundColor: "#fff",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 500 }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 500 }}>Email</label>
            <input
              type="email"
              value={email}
              readOnly
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
                backgroundColor: "#f3f4f6",
                color: "#6b7280"
              }}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "12px 20px",
              borderRadius: 6,
              backgroundColor: "#4f46e5",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </main>
    </>
  );
}

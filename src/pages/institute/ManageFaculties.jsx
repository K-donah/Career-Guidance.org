import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ManageFaculties() {
  const { faculties, addFaculty, deleteFaculty } = useAppData();
  const { user } = useAuth();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return alert("Enter faculty name");
    addFaculty({
      id: `fac_${Date.now()}`,
      name: name.trim(),
      institutionId: user.id.toString()
    });
    setName("");
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Faculties</h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <input
            placeholder="Faculty name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 16
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0b5fff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Add Faculty
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {faculties
            .filter(f => f.institutionId === user.id.toString())
            .map(f => (
              <li
                key={f.id}
                style={{
                  padding: 12,
                  backgroundColor: "#fff",
                  borderRadius: 6,
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                <span>{f.name}</span>
                <button
                  onClick={() => deleteFaculty(f.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#e53e3e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 14
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>

        {faculties.filter(f => f.institutionId === user.id.toString()).length === 0 && (
          <p style={{ color: "#666", marginTop: 12 }}>No faculties added yet.</p>
        )}
      </main>
    </>
  );
}

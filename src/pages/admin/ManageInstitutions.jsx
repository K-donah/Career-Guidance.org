import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageInstitutions() {
  const { institutions, addInstitution, updateInstitution, deleteInstitution } = useAppData();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return alert("Enter institution name");
    addInstitution({ id: `inst_${Date.now()}`, name: name.trim(), status: "approved" });
    setName("");
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Institutions</h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, maxWidth: 500 }}>
          <input
            type="text"
            placeholder="Institution name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
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
            Add Institution
          </button>
        </div>

        {institutions.length === 0 ? (
          <p style={{ color: "#666" }}>No institutions added yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: 6, overflow: "hidden" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>Name</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map(inst => (
                <tr key={inst.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{inst.name}</td>
                  <td style={{ padding: 12, textTransform: "capitalize", fontWeight: 600 }}>{inst.status}</td>
                  <td style={{ padding: 12, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => updateInstitution(inst.id, { status: "approved" })}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#10b981", color: "#fff", cursor: "pointer" }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateInstitution(inst.id, { status: "suspended" })}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#f59e0b", color: "#fff", cursor: "pointer" }}
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => deleteInstitution(inst.id)}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#ef4444", color: "#fff", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

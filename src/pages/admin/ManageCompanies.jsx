import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageCompanies() {
  const { companies, addCompany, updateCompany, deleteCompany } = useAppData();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return alert("Enter company name");
    addCompany({ id: `comp_${Date.now()}`, name: name.trim(), status: "pending" });
    setName("");
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Companies</h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, maxWidth: 500 }}>
          <input
            type="text"
            placeholder="Company name"
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
            Add
          </button>
        </div>

        {companies.length === 0 ? (
          <p style={{ color: "#666" }}>No registered companies.</p>
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
              {companies.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{c.name}</td>
                  <td style={{ padding: 12, textTransform: "capitalize", fontWeight: 600 }}>{c.status}</td>
                  <td style={{ padding: 12, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => updateCompany(c.id, { status: "approved" })}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#10b981", color: "#fff", cursor: "pointer" }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateCompany(c.id, { status: "suspended" })}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#f59e0b", color: "#fff", cursor: "pointer" }}
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => deleteCompany(c.id)}
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

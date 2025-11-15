import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function MonitorUsers() {
  const { users = [], updateUserStatus, deleteUser } = useAppData();

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Registered Users</h2>

        {users.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No registered users yet.</p>
        ) : (
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <thead style={{ backgroundColor: "#f3f4f6" }}>
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>Name</th>
                <th style={{ padding: 12 }}>Role</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: 12 }}>{user.name || "Unknown"}</td>
                  <td style={{ padding: 12, textTransform: "capitalize" }}>{user.role || "N/A"}</td>
                  <td style={{ padding: 12, fontWeight: 600, textTransform: "capitalize" }}>{user.status || "pending"}</td>
                  <td style={{ padding: 12, display: "flex", gap: 8 }}>
                    {user.status !== "active" && (
                      <button
                        onClick={() => updateUserStatus(user.id, "active")}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          border: "none",
                          backgroundColor: "#10b981",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Activate
                      </button>
                    )}
                    {user.status !== "suspended" && (
                      <button
                        onClick={() => updateUserStatus(user.id, "suspended")}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          border: "none",
                          backgroundColor: "#f59e0b",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Suspend
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        cursor: "pointer",
                      }}
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

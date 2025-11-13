import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function StudentApplications() {
  const { applications, updateApplication, admitApplication } = useAppData();
  const { user } = useAuth();

  // Admit student (context handles rejecting conflicting applications)
  const handleAdmit = (id) => {
    admitApplication(id);
    alert(
      "Student admitted. Other conflicting admissions within the same institution will be rejected."
    );
  };

  const handleReject = (id) => {
    updateApplication(id, { status: "rejected" });
  };

  const myApplications = applications.filter(a => a.institutionId === user.id);

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Student Applications</h2>

        {myApplications.length === 0 ? (
          <p style={{ color: "#666" }}>No applications received yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
            }}
          >
            <thead style={{ backgroundColor: "#0b5fff", color: "#fff" }}>
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>Student</th>
                <th style={{ padding: 12, textAlign: "left" }}>Course</th>
                <th style={{ padding: 12, textAlign: "left" }}>Status</th>
                <th style={{ padding: 12, textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map(a => (
                <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{a.studentName}</td>
                  <td style={{ padding: 12 }}>{a.courseTitle}</td>
                  <td style={{ padding: 12, textTransform: "capitalize" }}>{a.status}</td>
                  <td style={{ padding: 12, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => handleAdmit(a.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#10b981",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 14
                      }}
                    >
                      Admit
                    </button>
                    <button
                      onClick={() => handleReject(a.id)}
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
                      Reject
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

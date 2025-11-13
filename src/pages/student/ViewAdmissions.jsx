import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/ApplicationContext";

export default function ViewAdmissions() {
  const { user } = useAuth();
  const { applications } = useAppData();

  // Filter only applications for this student
  const myApplications = applications.filter(app => app.studentId === user.id);

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Your Admissions Results</h2>

        {myApplications.length === 0 ? (
          <p style={{ color: "#666", fontSize: 16 }}>No admissions results yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>Institution</th>
                <th style={{ padding: 12, textAlign: "left" }}>Course</th>
                <th style={{ padding: 12, textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map(app => (
                <tr key={app.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{app.institutionName}</td>
                  <td style={{ padding: 12 }}>{app.courseTitle}</td>
                  <td
                    style={{
                      padding: 12,
                      textTransform: "capitalize",
                      fontWeight: 600,
                      color:
                        app.status === "admitted"
                          ? "#10b981"
                          : app.status === "rejected"
                          ? "#ef4444"
                          : "#f59e0b"
                    }}
                  >
                    {app.status}
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

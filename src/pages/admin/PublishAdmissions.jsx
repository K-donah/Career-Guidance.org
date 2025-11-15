import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function PublishAdmissions() {
  const { applications, admitApplication } = useAppData();

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Publish Admissions</h2>

        {(!applications || applications.length === 0) ? (
          <p style={{ color: "#6b7280" }}>No applications to publish yet.</p>
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
                <th style={{ padding: 12, textAlign: "left" }}>Student</th>
                <th style={{ padding: 12 }}>Course</th>
                <th style={{ padding: 12 }}>Institution</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: 12 }}>{app.studentName || "Unknown"}</td>
                  <td style={{ padding: 12 }}>{app.courseName || "N/A"}</td>
                  <td style={{ padding: 12 }}>{app.institutionName || "N/A"}</td>
                  <td style={{ padding: 12, fontWeight: 600, textTransform: "capitalize" }}>{app.status || "pending"}</td>
                  <td style={{ padding: 12 }}>
                    {app.status !== "admitted" && (
                      <button
                        onClick={() => admitApplication(app.id)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#10b981",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Admit
                      </button>
                    )}
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

// src/pages/student/AdmissionsResults.jsx
import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function AdmissionsResults() {
  const { applications } = useAppData();
  const { user } = useAuth();

  const studentApps = applications.filter(a => a.studentId === user.id.toString());

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Your Admissions Results</h2>

        {studentApps.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: 16 }}>You have not applied to any courses yet.</p>
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
                <th style={{ padding: 12, textAlign: "left" }}>Course</th>
                <th style={{ padding: 12, textAlign: "left" }}>Institution</th>
                <th style={{ padding: 12, textAlign: "left" }}>Status</th>
                <th style={{ padding: 12, textAlign: "left" }}>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {studentApps.map(a => (
                <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{a.courseTitle}</td>
                  <td style={{ padding: 12 }}>{a.institutionName}</td>
                  <td
                    style={{
                      padding: 12,
                      textTransform: "capitalize",
                      fontWeight: 600,
                      color:
                        a.status === "admitted"
                          ? "#10b981" // green
                          : a.status === "rejected"
                          ? "#ef4444" // red
                          : "#f59e0b" // amber for pending
                    }}
                  >
                    {a.status}
                  </td>
                  <td style={{ padding: 12 }}>{new Date(a.appliedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ViewApplicants() {
  const { applications } = useAppData();
  const { user } = useAuth();

  // For prototype: show all applicants who applied (simplified)
  const applicantList = applications; // In real app, filter for company jobs

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Applicants</h2>

        {applicantList.length === 0 ? (
          <p style={{ color: "#666" }}>No applicants found yet.</p>
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
                <th style={{ padding: 12, textAlign: "left" }}>Institution</th>
                <th style={{ padding: 12, textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicantList.map(a => (
                <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{a.studentName}</td>
                  <td style={{ padding: 12 }}>{a.courseTitle}</td>
                  <td style={{ padding: 12 }}>{a.institutionName}</td>
                  <td style={{ padding: 12, textTransform: "capitalize" }}>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

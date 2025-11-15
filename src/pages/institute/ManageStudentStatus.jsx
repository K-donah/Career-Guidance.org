import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageStudentStatus() {
  const { applications, updateApplication, courses, faculties, institutions } = useAppData();

  if (!applications) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Student Status</h2>

        {applications.length === 0 ? (
          <p style={{ color: "#666" }}>No student applications yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: 6, overflow: "hidden" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>Student ID</th>
                <th style={{ padding: 12 }}>Course</th>
                <th style={{ padding: 12 }}>Faculty</th>
                <th style={{ padding: 12 }}>Institution</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const course = courses.find(c => c.id === app.courseId);
                const faculty = faculties.find(f => f.id === app.facultyId);
                const institution = institutions.find(i => i.id === app.institutionId);

                return (
                  <tr key={app.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 12 }}>{app.studentId}</td>
                    <td style={{ padding: 12 }}>{course?.title || "N/A"}</td>
                    <td style={{ padding: 12 }}>{faculty?.name || "N/A"}</td>
                    <td style={{ padding: 12 }}>{institution?.name || "N/A"}</td>
                    <td style={{ padding: 12, fontWeight: 600, textTransform: "capitalize" }}>{app.status}</td>
                    <td style={{ padding: 12, display: "flex", gap: 8 }}>
                      {["pending", "admitted", "rejected"].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateApplication(app.id, { status })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "none",
                            backgroundColor:
                              status === "admitted" ? "#10b981" :
                              status === "rejected" ? "#ef4444" : "#f59e0b",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

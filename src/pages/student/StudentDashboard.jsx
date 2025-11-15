import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function StudentDashboard() {
  const links = [
    { to: "/student/profile", label: "Update Profile / Documents" },
    { to: "/student/apply", label: "Apply for Courses" },
    { to: "/student/admissions", label: "Admissions Results" },
    { to: "/student/jobs", label: "Job Postings" },
    { to: "/student/transcripts", label: "Upload Transcripts / Certificates" },
  ];

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar links={links} />
        <main
          style={{
            flex: 1,
            padding: "32px",
            backgroundColor: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Dashboard Welcome Card */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Student Dashboard
            </h1>
            <p style={{ fontSize: "16px", color: "#4b5563" }}>
              Manage your profile, applications, document uploads, and view course admissions and job postings.
            </p>
          </div>

          {/* Dashboard Navigation Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: "block",
                  backgroundColor: "#4f46e5",
                  color: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: "600",
                  transition: "0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4338ca")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4f46e5")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

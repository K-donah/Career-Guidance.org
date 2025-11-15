import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // ✅ import Link

export default function InstituteDashboard() {
  const links = [
    { to: "/institute/profile", label: "Manage Profile" },
    { to: "/institute/faculties", label: "Faculties" },
    { to: "/institute/courses", label: "Courses" },
    { to: "/institute/applications", label: "Student Applications" },
    { to: "/institute/admissions", label: "Publish Admissions" },
    { to: "/institute/student-status", label: "Manage Student Status" },
  ];

  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
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
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>
              Welcome, {user?.name}!
            </h1>
            <p style={{ fontSize: "16px", color: "#4b5563" }}>
              This is your Institute Dashboard. Use the sidebar or the cards below to manage your profile, faculties, courses, publish admissions, and review student applications.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.to} // ✅ use Link instead of <a>
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
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
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

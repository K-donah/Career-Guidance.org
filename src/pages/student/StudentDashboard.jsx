import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function StudentDashboard() {
  const links = [
    { to: "/student/apply", label: "Apply for Courses" },
    { to: "/student/admissions", label: "Admissions Results" },
    { to: "/student/jobs", label: "Job Postings" },
  ];

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar links={links} />
        <main style={{ padding: 16, flex: 1 }}>
          <h2>Student Dashboard</h2>
          <p>View and manage your applications, profile, and job matches.</p>
        </main>
      </div>
    </>
  );
}

import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function CompanyDashboard() {
  const links = [
    { to: "/company/post-job", label: "Post Job" },
    { to: "/company/applicants", label: "View Applicants" },
  ];

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar links={links} />
        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f9fafb",
            minHeight: "100vh",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "24px",
              color: "#111827",
            }}
          >
            Company Dashboard
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
                Post Job
              </h3>
              <p>Submit new job opportunities for students and graduates.</p>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
                View Applicants
              </h3>
              <p>See all qualified applicants that match your job postings.</p>
            </div>
          </div>

          <div style={{ marginTop: "32px", color: "#6b7280", fontSize: "14px" }}>
            Use the cards above to manage job postings and review qualified candidates.
          </div>
        </main>
      </div>
    </>
  );
}

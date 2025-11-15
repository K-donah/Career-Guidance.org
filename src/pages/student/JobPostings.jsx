// src/pages/student/JobPostings.jsx
import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function JobPostings() {
  const { jobs, applyForJob } = useAppData();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "32px",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Available Job Opportunities
        </h2>

        {/* Main Job List Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            maxWidth: "900px",
          }}
        >
          {jobs.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              No job postings available at the moment.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    padding: "18px",
                    borderRadius: "10px",
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Job Title */}
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "6px",
                      color: "#1f2937",
                    }}
                  >
                    {job.title}
                  </h3>

                  {/* Company */}
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#4b5563",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>Company:</strong> {job.company}
                  </p>

                  {/* Description */}
                  {job.description && (
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6b7280",
                        marginBottom: "12px",
                      }}
                    >
                      {job.description}
                    </p>
                  )}

                  {/* Apply Button */}
                  <button
                    onClick={() => {
                      applyForJob(user.id, job);
                      alert("Application submitted!");
                    }}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#4f46e5",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

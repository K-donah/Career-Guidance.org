import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/ApplicationContext";

export default function JobApplications() {
  const { user } = useAuth();
  const { jobs } = useAppData();
  const [appliedIds, setAppliedIds] = useState([]);

  const handleApply = (job) => {
    if (appliedIds.includes(job.id)) return alert("Already applied");
    setAppliedIds((prev) => [...prev, job.id]);
    alert("Applied to job (prototype)");
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: 24 }}>
          Available Jobs
        </h2>

        {jobs.length === 0 && (
          <p style={{ color: "#6b7280" }}>No job postings available at the moment.</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
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
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: 8 }}>
                  {job.title}
                </h3>
                <p style={{ color: "#6b7280", marginBottom: 8 }}>
                  Company: {job.companyName}
                </p>
                <p style={{ color: "#10b981", fontWeight: 500 }}>{job.status}</p>
              </div>

              <button
                onClick={() => handleApply(job)}
                disabled={appliedIds.includes(job.id)}
                style={{
                  marginTop: 12,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: appliedIds.includes(job.id) ? "#d1d5db" : "#0b5fff",
                  color: "#fff",
                  border: "none",
                  cursor: appliedIds.includes(job.id) ? "not-allowed" : "pointer",
                }}
              >
                {appliedIds.includes(job.id) ? "Applied" : "Apply"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

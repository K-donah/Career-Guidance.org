import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function PostJob() {
  const { addJob, jobs } = useAppData();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");

  const handlePost = () => {
    if (!title.trim()) return alert("Enter job title");
    addJob({
      id: `job_${Date.now()}`,
      title: title.trim(),
      requirements,
      companyId: user.id,
      companyName: user.name,
      status: "open",
      postedAt: new Date().toISOString()
    });
    setTitle("");
    setRequirements("");
    alert("Job posted successfully!");
  };

  const myJobs = jobs.filter(j => j.companyId === user.id);

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Post a Job</h2>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 500, gap: 12 }}>
          <input
            type="text"
            placeholder="Job title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
          />
          <textarea
            placeholder="Job requirements"
            value={requirements}
            onChange={e => setRequirements(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", minHeight: 100, fontSize: 14, resize: "vertical" }}
          />
          <button
            onClick={handlePost}
            disabled={!title.trim()}
            style={{
              padding: "10px 20px",
              backgroundColor: !title.trim() ? "#ccc" : "#0b5fff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: !title.trim() ? "not-allowed" : "pointer",
              fontWeight: 600
            }}
          >
            Post Job
          </button>
        </div>

        <h3 style={{ marginTop: 32 }}>Your Posted Jobs</h3>
        {myJobs.length === 0 ? (
          <p style={{ color: "#666" }}>You haven’t posted any jobs yet.</p>
        ) : (
          <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: 12 }}>
            {myJobs.map(j => (
              <li
                key={j.id}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  backgroundColor: "#fff",
                  borderRadius: 6,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span>{j.title}</span>
                <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{j.status}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

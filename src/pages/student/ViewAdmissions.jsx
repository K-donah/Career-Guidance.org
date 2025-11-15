// src/pages/student/Transcripts.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function Transcripts() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Please select a file");
    // In a real app, upload file to server here
    alert(`Uploaded: ${file.name}`);
    setFile(null);
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Upload Transcripts / Certificates</h2>

        <div
          style={{
            maxWidth: 500,
            backgroundColor: "#fff",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          <label style={{ fontWeight: 500 }}>Select File</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />

          <button
            onClick={handleUpload}
            disabled={!file}
            style={{
              padding: "12px 20px",
              borderRadius: 6,
              backgroundColor: file ? "#4f46e5" : "#ccc",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              cursor: file ? "pointer" : "not-allowed",
              transition: "0.2s"
            }}
            onMouseOver={e => file && (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseOut={e => file && (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            Upload
          </button>
        </div>
      </main>
    </>
  );
}

// src/pages/student/Transcripts.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/ApplicationContext";

export default function Transcripts() {
  const { user } = useAuth();
  const { transcripts, uploadTranscript, deleteTranscript } = useAppData();
  const [file, setFile] = useState(null);

  // Filter only this student's transcripts
  const myTranscripts = transcripts.filter((t) => t.studentId === user.id);

  const handleUpload = () => {
    if (!file) return alert("Please select a file");
    uploadTranscript(user.id, file);
    alert(`Uploaded: ${file.name}`);
    setFile(null);
  };

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
          Upload Transcripts / Certificates
        </h2>

        {/* Upload Section Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            marginBottom: "28px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "12px",
              fontSize: "16px",
              color: "#374151",
              fontWeight: 600,
            }}
          >
            Select a file to upload:
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb",
                cursor: "pointer",
              }}
            />

            <button
              onClick={handleUpload}
              disabled={!file}
              style={{
                padding: "10px 20px",
                backgroundColor: file ? "#4f46e5" : "#a5b4fc",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: file ? "pointer" : "not-allowed",
                transition: "0.2s",
              }}
            >
              Upload File
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "16px",
              color: "#1f2937",
            }}
          >
            Uploaded Documents
          </h3>

          {myTranscripts.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              No transcripts uploaded yet.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f3f4f6",
                    borderBottom: "2px solid #e5e7eb",
                  }}
                >
                  <th
                    style={{
                      padding: "14px",
                      textAlign: "left",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    File Name
                  </th>
                  <th
                    style={{
                      padding: "14px",
                      textAlign: "left",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Uploaded Date
                  </th>
                  <th
                    style={{
                      padding: "14px",
                      textAlign: "left",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {myTranscripts.map((t) => (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      transition: "0.2s",
                    }}
                  >
                    <td style={{ padding: "14px", fontSize: "15px" }}>
                      {t.fileName}
                    </td>
                    <td style={{ padding: "14px", fontSize: "15px" }}>
                      {new Date(t.uploadedDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <button
                        onClick={() => deleteTranscript(t.id)}
                        style={{
                          padding: "8px 14px",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: 600,
                          transition: "0.2s",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}

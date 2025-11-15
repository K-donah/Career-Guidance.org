import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageCourses() {
  const { courses, addCourse, deleteCourse, faculties, institutions } = useAppData();
  const [title, setTitle] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const handleAdd = () => {
    if (!title || !facultyId) return alert("Select faculty and enter course title");
    const fac = faculties.find(f => f.id === facultyId);
    const instId = fac?.institutionId || null;
    const c = {
      id: `course_${Date.now()}`,
      title: title.trim(),
      facultyId,
      facultyName: fac?.name || "",
      institutionId: instId
    };
    addCourse(c);
    setTitle("");
    setFacultyId("");
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "24px",
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "Inter, sans-serif",
          color: "#111827",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
          Manage Courses
        </h2>

        {/* Add Course Section */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "16px",
              color: "#374151",
            }}
          >
            Add New Course
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                flex: "1 1 250px",
                fontSize: "14px",
              }}
            >
              <option value="">Select Faculty</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — {institutions.find((i) => i.id === f.institutionId)?.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Enter course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                flex: "1 1 200px",
                fontSize: "14px",
              }}
            />

            <button
              onClick={handleAdd}
              style={{
                padding: "10px 16px",
                backgroundColor: "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
              Add Course
            </button>
          </div>
        </div>

        {/* Course List Section */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "16px",
              color: "#374151",
            }}
          >
            Course List
          </h3>

          {courses.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No courses added yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {courses.map((c) => (
                <li
                  key={c.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.title}</div>
                    <div style={{ fontSize: "14px", color: "#6b7280" }}>
                      {c.facultyName} — {institutions.find((i) => i.id === c.institutionId)?.name}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCourse(c.id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

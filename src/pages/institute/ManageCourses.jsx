import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ManageCourses() {
  const { courses, addCourse, deleteCourse, faculties } = useAppData();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [facultyId, setFacultyId] = useState("");

  // Get the institute profile from localStorage
  const instituteProfile =
    JSON.parse(localStorage.getItem(`institute_profile_${user.id}`)) || { name: "" };

  // Only faculties for this institute
  const myFaculties = faculties.filter(f => f.institutionId === user.id.toString());

  // Handle adding a new course
  const handleAdd = () => {
    if (!title || !facultyId) return alert("Fill title and select faculty");

    const fac = faculties.find(f => f.id === facultyId);

    addCourse({
      id: `course_${Date.now()}`,
      title: title.trim(),
      facultyId,
      facultyName: fac?.name || "",
      institutionId: user.id,                     // link course to this institution
      institutionName: instituteProfile.name      // store the institution name
    });

    setTitle("");
    setFacultyId("");
  };

  // Courses for this institution
  const myCourses = courses.filter(c => c.institutionId === user.id.toString());

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Courses</h2>

        {/* Add Course */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <select
            value={facultyId}
            onChange={e => setFacultyId(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
          >
            <option value="">Select Faculty</option>
            {myFaculties.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>

          <input
            placeholder="Course title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ flex: 2, padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
          />

          <button
            onClick={handleAdd}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0b5fff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Add Course
          </button>
        </div>

        {/* List Courses */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {myCourses.map(c => (
            <li
              key={c.id}
              style={{
                padding: 12,
                backgroundColor: "#fff",
                borderRadius: 6,
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <span>{c.title} — {c.facultyName} — <em>{c.institutionName}</em></span>
              <button
                onClick={() => deleteCourse(c.id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#e53e3e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 14
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {myCourses.length === 0 && (
          <p style={{ color: "#666", marginTop: 12 }}>No courses added yet.</p>
        )}
      </main>
    </>
  );
}

// src/pages/student/ApplyForCourse.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ApplyForCourse() {
  const { courses, applyForCourse } = useAppData();
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [applicationText, setApplicationText] = useState("");

  const availableCourses = courses.filter(
    (course) => course.institutionId && course.facultyName
  );

  const handleApply = () => {
    const selectedCourse = courses.find((c) => c.id === selectedCourseId);
    if (!selectedCourse) return;

    applyForCourse({
      id: `app_${Date.now()}`,
      studentId: user.id.toString(),
      studentName: user.name,
      courseId: selectedCourseId,
      courseTitle: selectedCourse.title,
      facultyId: selectedCourse.facultyId || "",
      facultyName: selectedCourse.facultyName,
      institutionId: selectedCourse.institutionId,
      institutionName: selectedCourse.institutionName,
      applicationText: applicationText.trim(),
      status: "pending",
      appliedDate: new Date().toISOString(),
    });

    setSelectedCourseId("");
    setApplicationText("");
    alert("Application submitted successfully!");
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
          Apply for a Course
        </h2>

        {/* Card Container */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "28px",
            borderRadius: "12px",
            maxWidth: "700px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {availableCourses.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              No courses are currently available.
            </p>
          ) : (
            <>
              {/* Course Selection */}
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                Select Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#f9fafb",
                  marginBottom: "20px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                <option value="">-- Choose a Course --</option>
                {availableCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — {c.facultyName}
                  </option>
                ))}
              </select>

              {/* Application Text */}
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                Why do you want to take this course?
              </label>
              <textarea
                placeholder="Write your motivation..."
                value={applicationText}
                onChange={(e) => setApplicationText(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "140px",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#f9fafb",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              />

              {/* Apply Button */}
              <button
                onClick={handleApply}
                disabled={!selectedCourseId || !applicationText.trim()}
                style={{
                  padding: "12px 24px",
                  backgroundColor:
                    selectedCourseId && applicationText.trim()
                      ? "#4f46e5"
                      : "#a5b4fc",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "8px",
                  cursor:
                    selectedCourseId && applicationText.trim()
                      ? "pointer"
                      : "not-allowed",
                  transition: "0.2s",
                }}
              >
                Submit Application
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

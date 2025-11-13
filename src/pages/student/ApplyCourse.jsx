import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ApplyForCourse() {
  const { courses, applyForCourse } = useAppData();
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [applicationText, setApplicationText] = useState("");

  // Filter courses that belong to institutions & faculties
  const availableCourses = courses.filter(course => course.institutionId && course.facultyId);

  const handleApply = () => {
    if (!selectedCourseId) return alert("Please select a course");
    if (!applicationText.trim()) return alert("Please provide application text");

    const selectedCourse = courses.find(c => c.id === selectedCourseId);

applyForCourse({
  id: `application_${Date.now()}`,
  studentId: user.id.toString(),
  studentName: user.name,
  courseId: selectedCourseId,
  courseTitle: selectedCourse?.title || "",
  facultyId: selectedCourse?.facultyId || "",
  facultyName: selectedCourse?.facultyName || "",
  institutionId: selectedCourse?.institutionId || "",
  institutionName: selectedCourse?.institutionName || "",  // <- add this
  applicationText: applicationText.trim(),
  status: "pending",
  appliedDate: new Date().toISOString()
});


    setSelectedCourseId("");
    setApplicationText("");
    alert("Application submitted successfully!");
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: 24 }}>Apply for a Course</h2>

        {availableCourses.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No courses available for application at the moment.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 20,
              maxWidth: 500
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="course-select" style={{ marginBottom: 8, fontWeight: 500 }}>
                Select Course
              </label>
              <select
                id="course-select"
                value={selectedCourseId}
                onChange={e => setSelectedCourseId(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16
                }}
              >
                <option value="">Choose a course...</option>
                {availableCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title} — {course.facultyName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="application-text" style={{ marginBottom: 8, fontWeight: 500 }}>
                Application Letter
              </label>
              <textarea
                id="application-text"
                placeholder="Explain why you want to take this course..."
                value={applicationText}
                onChange={e => setApplicationText(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  minHeight: 120,
                  resize: "vertical",
                  fontSize: 16
                }}
              />
            </div>

            <button
              onClick={handleApply}
              disabled={!selectedCourseId || !applicationText.trim()}
              style={{
                padding: "12px 20px",
                borderRadius: 6,
                backgroundColor: !selectedCourseId || !applicationText.trim() ? "#ccc" : "#0b5fff",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                cursor: !selectedCourseId || !applicationText.trim() ? "not-allowed" : "pointer"
              }}
            >
              Submit Application
            </button>
          </div>
        )}
      </main>
    </>
  );
}

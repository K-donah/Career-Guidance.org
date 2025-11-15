import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageInstitutions() {
  const { institutions, addInstitution, updateInstitution, deleteInstitution, faculties, addFaculty, deleteFaculty, courses, addCourse, deleteCourse } = useAppData();

  // Local states
  const [institutionName, setInstitutionName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Add new institution
  const handleAddInstitution = () => {
    if (!institutionName.trim()) return alert("Enter institution name");
    addInstitution({ id: `inst_${Date.now()}`, name: institutionName.trim(), status: "approved" });
    setInstitutionName("");
  };

  // Add faculty under selected institution
  const handleAddFaculty = () => {
    if (!selectedInstitution) return alert("Select an institution first");
    if (!facultyName.trim()) return alert("Enter faculty name");
    addFaculty({
      id: `fac_${Date.now()}`,
      name: facultyName.trim(),
      institutionId: selectedInstitution.id,
    });
    setFacultyName("");
  };

  // Add course under selected faculty
  const handleAddCourse = () => {
    if (!selectedFaculty) return alert("Select a faculty first");
    if (!courseTitle.trim()) return alert("Enter course title");
    addCourse({
      id: `course_${Date.now()}`,
      title: courseTitle.trim(),
      facultyId: selectedFaculty.id,
      facultyName: selectedFaculty.name,
      institutionId: selectedFaculty.institutionId,
    });
    setCourseTitle("");
  };

  // Filtered faculties and courses
  const facultiesForInstitution = faculties.filter(f => f.institutionId === selectedInstitution?.id);
  const coursesForFaculty = courses.filter(c => c.facultyId === selectedFaculty?.id);

  return (
    <>
      <Navbar />
      <main style={{ padding: 24, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Institution Management</h2>

        {/* --- Add Institution --- */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, maxWidth: 500 }}>
          <input
            type="text"
            placeholder="Institution name"
            value={institutionName}
            onChange={e => setInstitutionName(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
          <button
            onClick={handleAddInstitution}
            style={{ padding: "10px 20px", backgroundColor: "#0b5fff", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}
          >
            Add Institution
          </button>
        </div>

        {/* --- Institution Table --- */}
        {institutions.length === 0 ? (
          <p style={{ color: "#666" }}>No institutions added yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: 6, overflow: "hidden", marginBottom: 24 }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>Name</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map(inst => (
                <tr key={inst.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{inst.name}</td>
                  <td style={{ padding: 12, textTransform: "capitalize", fontWeight: 600 }}>{inst.status}</td>
                  <td style={{ padding: 12, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setSelectedInstitution(inst)}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#2563eb", color: "#fff" }}
                    >
                      Manage
                    </button>
                    <button
                      onClick={() => updateInstitution(inst.id, { status: "approved" })}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#10b981", color: "#fff" }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateInstitution(inst.id, { status: "suspended" })}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#f59e0b", color: "#fff" }}
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => deleteInstitution(inst.id)}
                      style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#ef4444", color: "#fff" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* --- Faculties Section --- */}
        {selectedInstitution && (
          <section style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
              Faculties under <span style={{ color: "#2563eb" }}>{selectedInstitution.name}</span>
            </h3>

            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <input
                placeholder="Faculty name"
                value={facultyName}
                onChange={e => setFacultyName(e.target.value)}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
              />
              <button
                onClick={handleAddFaculty}
                style={{ padding: "10px 20px", backgroundColor: "#0b5fff", color: "#fff", border: "none", borderRadius: 6 }}
              >
                Add Faculty
              </button>
            </div>

            {facultiesForInstitution.map(f => (
              <div key={f.id} style={{ background: "#fff", padding: 12, borderRadius: 6, marginBottom: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{f.name}</strong>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setSelectedFaculty(f)}
                      style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6 }}
                    >
                      Manage Courses
                    </button>
                    <button
                      onClick={() => deleteFaculty(f.id)}
                      style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- Courses Section --- */}
        {selectedFaculty && (
          <section style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
              Courses under <span style={{ color: "#2563eb" }}>{selectedFaculty.name}</span>
            </h3>

            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <input
                placeholder="Course title"
                value={courseTitle}
                onChange={e => setCourseTitle(e.target.value)}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
              />
              <button
                onClick={handleAddCourse}
                style={{ padding: "10px 20px", backgroundColor: "#0b5fff", color: "#fff", border: "none", borderRadius: 6 }}
              >
                Add Course
              </button>
            </div>

            {coursesForFaculty.map(c => (
              <div key={c.id} style={{ background: "#fff", padding: 10, borderRadius: 6, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{c.title}</span>
                <button
                  onClick={() => deleteCourse(c.id)}
                  style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6 }}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
}

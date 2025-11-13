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
    const c = { id: `course_${Date.now()}`, title: title.trim(), facultyId, facultyName: fac?.name || "", institutionId: instId };
    addCourse(c);
    setTitle("");
    setFacultyId("");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 16 }}>
        <h3>Manage Courses</h3>
        <div style={{ marginBottom: 12 }}>
          <select value={facultyId} onChange={e=>setFacultyId(e.target.value)}>
            <option value="">Select Faculty</option>
            {faculties.map(f => <option key={f.id} value={f.id}>{f.name} — {institutions.find(i => i.id === f.institutionId)?.name}</option>)}
          </select>
          <input placeholder="Course title" value={title} onChange={e=>setTitle(e.target.value)} style={{ marginLeft: 8 }} />
          <button onClick={handleAdd} style={{ marginLeft: 8 }}>Add Course</button>
        </div>

        <ul>
          {courses.map(c => (
            <li key={c.id}>
              {c.title} — {c.facultyName} — {institutions.find(i => i.id === c.institutionId)?.name}
              <button onClick={() => deleteCourse(c.id)} style={{ marginLeft: 8 }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

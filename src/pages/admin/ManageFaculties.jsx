import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageFaculties() {
  const { faculties, addFaculty, deleteFaculty, institutions } = useAppData();
  const [name, setName] = useState("");
  const [institutionId, setInstitutionId] = useState("");

  const handleAdd = () => {
    if (!name || !institutionId) return alert("Select institution and add faculty name");
    const f = { id: `fac_${Date.now()}`, name: name.trim(), institutionId };
    addFaculty(f);
    setName("");
    setInstitutionId("");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 16 }}>
        <h3>Manage Faculties</h3>
        <div style={{ marginBottom: 12 }}>
          <select value={institutionId} onChange={e=>setInstitutionId(e.target.value)}>
            <option value="">Select Institution</option>
            {institutions.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
          <input placeholder="Faculty name" value={name} onChange={e=>setName(e.target.value)} style={{ marginLeft: 8 }} />
          <button onClick={handleAdd} style={{ marginLeft: 8 }}>Add</button>
        </div>

        <ul>
          {faculties.map(f => (
            <li key={f.id}>
              {f.name} — {institutions.find(i => i.id === f.institutionId)?.name || "Unknown"}
              <button onClick={() => deleteFaculty(f.id)} style={{ marginLeft: 8 }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageFaculties() {
  const { faculties, addFaculty, deleteFaculty, institutions } = useAppData();
  const [name, setName] = useState("");
  const [institutionId, setInstitutionId] = useState("");

  const handleAdd = () => {
    if (!name || !institutionId)
      return alert("Select institution and add faculty name");
    const f = { id: `fac_${Date.now()}`, name: name.trim(), institutionId };
    addFaculty(f);
    setName("");
    setInstitutionId("");
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
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          Manage Faculties
        </h2>

        {/* Add Faculty Section */}
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
            Add New Faculty
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
              value={institutionId}
              onChange={(e) => setInstitutionId(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                flex: "1 1 250px",
                fontSize: "14px",
              }}
            >
              <option value="">Select Institution</option>
              {institutions.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Faculty name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#4338ca")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#4f46e5")
              }
            >
              Add Faculty
            </button>
          </div>
        </div>

        {/* Faculties List Section */}
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
            Faculty List
          </h3>

          {faculties.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No faculties added yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {faculties.map((f) => (
                <li
                  key={f.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: "14px", color: "#6b7280" }}>
                      {
                        institutions.find((i) => i.id === f.institutionId)
                          ?.name || "Unknown Institution"
                      }
                    </div>
                  </div>
                  <button
                    onClick={() => deleteFaculty(f.id)}
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
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dc2626")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ef4444")
                    }
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

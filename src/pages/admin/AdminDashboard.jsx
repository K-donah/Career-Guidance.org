import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          flex: 1,
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>
          Admin Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>Manage Institutions</h3>
            <Link
              to="/admin/institutions"
              style={{
                textDecoration: "none",
                padding: "10px 16px",
                backgroundColor: "#4f46e5",
                color: "#fff",
                textAlign: "center",
                borderRadius: "8px",
                fontWeight: 500,
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
              Open
            </Link>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>Manage Companies</h3>
            <Link
              to="/admin/companies"
              style={{
                textDecoration: "none",
                padding: "10px 16px",
                backgroundColor: "#4f46e5",
                color: "#fff",
                textAlign: "center",
                borderRadius: "8px",
                fontWeight: 500,
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
              Open
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "32px", color: "#6b7280", fontSize: "14px" }}>
          Use the cards above to manage system data and publish admissions.
        </div>
      </main>
    </>
  );
}

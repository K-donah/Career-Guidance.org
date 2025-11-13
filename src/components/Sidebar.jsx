import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links = [] }) {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 220,
        borderRight: "1px solid #e5e7eb",
        padding: "24px 12px",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
        Dashboard
      </h2>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {links.map((l) => {
          const isActive = location.pathname === l.to;

          return (
            <li key={l.to}>
              <Link
                to={l.to}
                style={{
                  display: "block",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "500",
                  color: isActive ? "#fff" : "#1f2937",
                  backgroundColor: isActive ? "#4f46e5" : "transparent",
                  transition: "0.2s",
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "#e0e7ff";
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

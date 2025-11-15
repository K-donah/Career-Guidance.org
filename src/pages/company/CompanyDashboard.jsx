import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function CompanyDashboard() {
  const links = [
    { to: "/company/post-job", label: "Post Job" },
    { to: "/company/applicants", label: "View Applicants" },
    { to: "/company/profile", label: "Update Profile" },
    { to: "/company/settings", label: "Settings" },
  ];

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
    cursor: "pointer",
  };

  const cardHover = {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar links={links} />

        <main
          style={{
            flex: 1,
            padding: "32px",
            backgroundColor: "#f3f4f6",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "28px",
              color: "#1f2937",
            }}
          >
            Company Dashboard
          </h2>

          {/* Main Feature Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Post Job Card */}
            <a
              href="/company/post-job"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, cardStyle)
                }
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  📝 Post Job
                </h3>
                <p style={{ marginTop: "8px", color: "#6b7280" }}>
                  Create new job postings with qualifications, requirements, and
                  applicant criteria.
                </p>
              </div>
            </a>

            {/* View Applicants */}
            <a
              href="/company/applicants"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, cardStyle)
                }
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  👥 Qualified Applicants
                </h3>
                <p style={{ marginTop: "8px", color: "#6b7280" }}>
                  View automatically filtered applicants based on academic
                  performance, certificates, experience, and job relevance.
                </p>
              </div>
            </a>

            {/* Update Profile */}
            <a
              href="/company/profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, cardStyle)
                }
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  🏢 Update Profile
                </h3>
                <p style={{ marginTop: "8px", color: "#6b7280" }}>
                  Update company information, logo, contact details, and hiring
                  preferences.
                </p>
              </div>
            </a>

            {/* Settings */}
            <a
              href="/company/settings"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, cardStyle)
                }
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  ⚙️ Settings
                </h3>
                <p style={{ marginTop: "8px", color: "#6b7280" }}>
                  Manage login security, email verification and notification
                  preferences.
                </p>
              </div>
            </a>
          </div>

          <div style={{ marginTop: "40px", fontSize: "14px", color: "#6b7280" }}>
            Manage your job postings, filter applicants, and maintain your
            company's professional profile.
          </div>
        </main>
      </div>
    </>
  );
}

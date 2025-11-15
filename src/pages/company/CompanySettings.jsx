import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function CompanySettings() {
  const { user } = useAuth();

  const links = [
    { to: "/company/post-job", label: "Post Job" },
    { to: "/company/applicants", label: "View Applicants" },
    { to: "/company/profile", label: "Update Profile" },
    { to: "/company/settings", label: "Settings" },
  ];

  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handlePasswordChange = () => alert("Password updated successfully!");
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account permanently?")) {
      alert("Account deleted");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar links={links} />

        <main style={{ flex: 1, padding: "32px", background: "#f3f4f6" }}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "20px",
            }}
          >
            Settings
          </h2>

          <div
            style={{
              background: "#fff",
              padding: "28px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              maxWidth: "600px",
            }}
          >
            {/* Email Notifications */}
            <section style={sectionStyle}>
              <h3 style={sectionTitle}>Email Notifications</h3>
              <label style={toggleLabel}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                Receive job application alerts
              </label>
            </section>

            {/* Two Factor Auth */}
            <section style={sectionStyle}>
              <h3 style={sectionTitle}>Two-Factor Authentication</h3>
              <label style={toggleLabel}>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                />
                Enable 2FA
              </label>
            </section>

            {/* Change Password */}
            <section style={sectionStyle}>
              <h3 style={sectionTitle}>Change Password</h3>
              <button style={simpleButton} onClick={handlePasswordChange}>
                Change Password
              </button>
            </section>

            {/* Danger Zone */}
            <section style={{ ...sectionStyle, borderTop: "1px solid #e5e7eb" }}>
              <h3 style={{ ...sectionTitle, color: "#b91c1c" }}>Danger Zone</h3>
              <button style={dangerButton} onClick={handleDeleteAccount}>
                Delete Company Account
              </button>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

/* STYLES */

const sectionStyle = { marginBottom: "24px" };
const sectionTitle = { fontSize: "18px", fontWeight: "600", marginBottom: "8px" };
const toggleLabel = { display: "flex", alignItems: "center", gap: "10px" };

const simpleButton = {
  padding: "10px 18px",
  background: "#4f46e5",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const dangerButton = {
  padding: "10px 18px",
  background: "#dc2626",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
};

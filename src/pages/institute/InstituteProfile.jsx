import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function InstituteProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(`institute_profile_${user?.id}`)) || {
          name: user?.name || "",
          email: "",
          phone: "",
          address: "",
          description: "",
          logo: ""
        }
      );
    } catch {
      return {
        name: user?.name || "",
        email: "",
        phone: "",
        address: "",
        description: "",
        logo: ""
      };
    }
  });

  useEffect(() => {
    if (user?.id) localStorage.setItem(`institute_profile_${user.id}`, JSON.stringify(profile));
  }, [profile, user]);

  const handleLogo = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setProfile(p => ({ ...p, logo: reader.result }));
    reader.readAsDataURL(f);
  };

  const sidebarLinks = [
    { to: "/institute/profile", label: "Manage Profile" },
    { to: "/institute/faculties", label: "Faculties" },
    { to: "/institute/courses", label: "Courses" },
    { to: "/institute/applications", label: "Student Applications" },
  ];

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar links={sidebarLinks} />
        <main style={{ flex: 1, padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Profile</h2>
          <div style={{ maxWidth: 700, display: "grid", gap: 16 }}>
            
            {profile.logo && (
              <img
                src={profile.logo}
                alt="Logo"
                style={{ width: 120, height: 120, borderRadius: 12, objectFit: "cover" }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Institution Name</label>
              <input
                value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Email</label>
              <input
                value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                type="email"
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Phone</label>
              <input
                value={profile.phone}
                onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Address</label>
              <input
                value={profile.address}
                onChange={e => setProfile(p => ({ ...p, address: e.target.value }))}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Description</label>
              <textarea
                value={profile.description}
                onChange={e => setProfile(p => ({ ...p, description: e.target.value }))}
                rows={4}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Logo</label>
              <input type="file" accept="image/*" onChange={handleLogo} />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => alert("Profile saved")}
              style={{
                padding: "12px 20px",
                borderRadius: 6,
                backgroundColor: "#0b5fff",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                marginTop: 12,
                maxWidth: 200
              }}
            >
              Save Profile
            </button>

          </div>
        </main>
      </div>
    </>
  );
}

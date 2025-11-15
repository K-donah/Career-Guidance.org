import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/ApplicationContext";

export default function CompanyProfile() {
  const { user, updateUser } = useAuth();
  const { updateCompanyProfile } = useAppData();

  const links = [
    { to: "/company/post-job", label: "Post Job" },
    { to: "/company/applicants", label: "View Applicants" },
    { to: "/company/profile", label: "Update Profile" },
    { to: "/company/settings", label: "Settings" },
  ];

  const [form, setForm] = useState({
    companyName: user.companyName || "",
    email: user.email || "",
    industry: user.industry || "",
    phone: user.phone || "",
    address: user.address || "",
    description: user.description || "",
    logo: user.logo || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, logo: URL.createObjectURL(files[0]) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    updateCompanyProfile(user.id, form);
    updateUser({ ...user, ...form });
    alert("Profile updated successfully!");
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar links={links} />

        <main
          style={{
            flex: 1,
            padding: "32px",
            background: "#f3f4f6",
            minHeight: "100vh",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Company Profile
          </h2>

          <div
            style={{
              background: "#fff",
              padding: "28px",
              borderRadius: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              maxWidth: "650px",
            }}
          >
            {/* Logo Display */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <img
                src={form.logo || "https://via.placeholder.com/120"}
                alt="Company Logo"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                }}
              />
            </div>

            {/* Upload Logo */}
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />

            {/* Form Grid */}
            <div style={{ display: "grid", gap: "16px" }}>
              <Input label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              <Input label="Industry" name="industry" value={form.industry} onChange={handleChange} />
              <Input label="Contact Number" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="Address" name="address" value={form.address} onChange={handleChange} />

              <div>
                <label style={labelStyle}>Company Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  style={textareaStyle}
                  placeholder="Describe your company..."
                ></textarea>
              </div>
            </div>

            <button style={saveButtonStyle} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

/* ---- STYLES ---- */

const labelStyle = {
  fontWeight: "600",
  fontSize: "14px",
  color: "#374151",
  marginBottom: "6px",
  display: "block",
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const saveButtonStyle = {
  marginTop: "20px",
  padding: "12px 20px",
  backgroundColor: "#4f46e5",
  color: "#fff",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  width: "100%",
  fontWeight: "600",
};

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}

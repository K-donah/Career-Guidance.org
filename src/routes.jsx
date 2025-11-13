import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Home Page
import Home from "./pages/Home"; // ✅ Import your Home page

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageInstitutions from "./pages/admin/ManageInstitutions";
import ManageFacultiesAdmin from "./pages/admin/ManageFaculties";
import ManageCoursesAdmin from "./pages/admin/ManageCourses";
import ManageCompanies from "./pages/admin/ManageCompanies";
import Reports from "./pages/admin/Reports";

// Institute
import InstituteDashboard from "./pages/institute/InstituteDashboard";
import InstituteProfile from "./pages/institute/InstituteProfile";
import ManageFaculties from "./pages/institute/ManageFaculties";
import ManageCourses from "./pages/institute/ManageCourses";
import StudentApplications from "./pages/institute/StudentApplications";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import ApplyCourse from "./pages/student/ApplyCourse";
import ViewAdmissions from "./pages/student/ViewAdmissions";
import JobApplications from "./pages/student/JobApplications";

// Company
import CompanyDashboard from "./pages/company/CompanyDashboard";
import PostJob from "./pages/company/PostJob";
import ViewApplicants from "./pages/company/ViewApplicants";

export default function RoutesConfig() {
  return (
    <Routes>
      {/* ✅ Default landing page */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/institutions" element={<ManageInstitutions />} />
        <Route path="/admin/faculties" element={<ManageFacultiesAdmin />} />
        <Route path="/admin/courses" element={<ManageCoursesAdmin />} />
        <Route path="/admin/companies" element={<ManageCompanies />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      {/* Institute Routes */}
      <Route element={<ProtectedRoute role="institute" />}>
        <Route path="/institute" element={<InstituteDashboard />} />
        <Route path="/institute/profile" element={<InstituteProfile />} />
        <Route path="/institute/faculties" element={<ManageFaculties />} />
        <Route path="/institute/courses" element={<ManageCourses />} />
        <Route path="/institute/applications" element={<StudentApplications />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/apply" element={<ApplyCourse />} />
        <Route path="/student/admissions" element={<ViewAdmissions />} />
        <Route path="/student/jobs" element={<JobApplications />} />
      </Route>

      {/* Company Routes */}
      <Route element={<ProtectedRoute role="company" />}>
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/company/post-job" element={<PostJob />} />
        <Route path="/company/applicants" element={<ViewApplicants />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<h2 style={{ padding: 20 }}>404 - Page not found</h2>} />
    </Routes>
  );
}

import React from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function Reports() {
  const { institutions, faculties, courses, applications, companies, jobs } = useAppData();

  return (
    <>
      <Navbar />
      <div style={{ padding: 16 }}>
        <h3>System Reports</h3>
        <p>Total Institutions: {institutions.length}</p>
        <p>Total Faculties: {faculties.length}</p>
        <p>Total Courses: {courses.length}</p>
        <p>Total Applications: {applications.length}</p>
        <p>Total Companies: {companies.length}</p>
        <p>Total Jobs: {jobs.length}</p>
      </div>
    </>
  );
}
